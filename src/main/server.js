import express from 'express';
import { validateLogin, checkDate } from './utils';
import couchDb from './database';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

import { config, sql } from './SQL/sqlConnection.js'
import { SqlToJson, buildSQL } from './SQL/d.js';
import moment, { updateLocale } from 'moment';




const server = express();

const credentials = {
    user: "admin",
    pass: "admin"
};

const DATE_FORMAT = "yyyy-MM-DD";


const driver = new couchDb(credentials);



server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ limit: "100mb" }));
server.use(cors())



server.post("/api/login", (req, res) => {

    if (!validateLogin(req.body)) return res.status(200).json({ status: "error", message: "missing fields" });
    const { employee_id, password } = req.body;

    driver.findByEmployeeId("users", employee_id).then(response => {

        if (!response) return res.status(200).json({ status: "error", message: `user with employee_id ${employee_id} not found` })

        // ! DEGUB consente sempre l'accesso
        // return res.status(200).json({ status: "success", user: { ...response.key, token: jwt.sign(employee_id, "resg45ythbs.3456345.-") } })
        if (bcrypt.compareSync(password, response.key.password)) {
            let tmp = response.key;
            delete tmp.password
            res.status(200).json({ status: "success", user: { ...tmp, token: jwt.sign(employee_id, "resg45ythbs.3456345.-") } })
        } else {
            res.status(200).json({ status: "error", message: "wrong credentials" })
        }
    }).catch(err => {
        res.status(200).json({ status: "error", message: `error while searching user with employee_id ${employee_id} , err: ${err.message}` })
    })
});



server.get("/api/bizerba/scontrino/:id/rep/:n", (req, res) => {


    sql.connect(config, err => {
        if (err) return res.json({ status: "error", message: err.message });
        const request = new sql.Request();
        const SQL = `SELECT * FROM [dbo].[SCONTRINI] WHERE BNNR=${req.params.id} AND PNAB=${parseInt(req.params.n)}`
        request.query(SQL, (err, result) => {
            if (err) return res.json({ status: "error", message: err.message });
            let target = result.recordset
            if (!target) return res.json({ status: "error", message: "no item found" });

            const processed = SqlToJson(target);
            res.json({ status: "success", res: processed }); //data:SqlToJson(target)
        })
    })
});



server.post("/api/update-prices", async (req, res) => {

    const created_at = moment().format(DATE_FORMAT);
    const TEMP_USER = "user";

    let check = req.body;



    async function truncateDb() {
        return new Promise((resolve, reject) => {
            sql.connect(config, async err => {
                const delRequest = new sql.Request();
                if (err) reject(err.message);
                await delRequest.query("TRUNCATE table [dbo].[plu]")
                resolve()

            })
        })
    }


    async function uploadPrices() {
        const SQLS = await buildSQL(check);
        return new Promise((resolve, reject) => {
            sql.connect(config, async err => {

                if (err) reject(err.message)
                const addRequest = new sql.Request();

                for (let sql of SQLS) {

                    addRequest.query(sql, async (err, result) => {
                        if (err) reject(err.message)

                    })

                }

                resolve()

            })
        })
    }


    async function fetchData() {
        const SQL = "SELECT * FROM [dbo].[plu]";

        return new Promise((resolve, reject) => {
            sql.connect(config, async err => {
                if (err) reject(err.message)


                const addRequest = new sql.Request();

                addRequest.query(SQL, async (err, result) => {
                    if (err) reject(err.message);

                    resolve(result);
                })
            })
        })
    }
    const PRICELIST_DB_NAME = "central";

    truncateDb().then(async () => {
        uploadPrices().then(async () => {
            const response = await fetchData();
            res.json({ status: "ok", data: response.recordset })
        })
    })


})



export default server;
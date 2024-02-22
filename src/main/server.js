import express from 'express';
import { validateLogin, checkDate } from './utils';
import couchDb from './database';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

import { config, sql } from './SQL/sqlConnection.js'
import { SqlToJson, buildSQL } from './SQL/d.js';
import moment from 'moment';




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

    console.log(req.params);

    sql.connect(config, err => {
        if (err) return res.json({ status: "error", message: err.message });
        const request = new sql.Request();
        const SQL = `SELECT * FROM [dbo].[SCONTRINI] WHERE BNNR=${req.params.id} AND PNAB=${parseInt(req.params.n)}`
        request.query(SQL, (err, result) => {
            if (err) return res.json({ status: "error", message: err.message });
            let target = result.recordset
            if (!target) return res.json({ status: "error", message: "no item found" });

            const processed = SqlToJson(target);
            // console.log(processed);
            res.json({ status: "success", res: processed }); //data:SqlToJson(target)
        })
    })
});



server.post("/api/update-prices", async (req, res) => {

    const created_at = moment().format(DATE_FORMAT);
    const TEMP_USER = "user";

    let check = req.body;
    let toBe = check.length;

    let data = check[0].price_date;


    let nq = checkDate(check, toBe, data)

    // ! QUESTA DUNZIONE RITORNA true SE CE' UN INDEX DI UN PRODOTTO CHE NON RISPETTA LA DATA MEDIA
    if (nq) return res.json({ status: "errore", message: `trovata un incongruenza con le date dei prezzi` })



    const price_list_by_date = await driver.findAll("central", "_design/prices/_view/price_list_by_date");


    const found_by_date = price_list_by_date.find(x => x.key == data)




    if (found_by_date) {
        res.json({ message: "da aggiornare" })

    } else {
        // let dat = {
        //     created_at: created_at,
        //     created_by: TEMP_USER,
        //     updated_at: created_at,
        //     updated_by: TEMP_USER,
        //     price_date: check[0].price_date,
        //     lista: check,
        // }
        const SQL = await buildSQL(check);


        sql.connect(config, err => {
            if (err) return res.json({ status: "error", message: err.message });
            const request = new sql.Request();
            request.query(SQL, (err, result) => {
                if (err) return res.json({ status: "error", message: err.message });
                let target = result.recordset
                if (!target) return res.json({ status: "error", message: "no item found" });

                const processed = SqlToJson(target);
                // console.log(processed);
                res.json({ status: "success", res: processed }); //data:SqlToJson(target)
            })
        })
    }


})



export default server;
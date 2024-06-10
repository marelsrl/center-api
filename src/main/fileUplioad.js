import express from 'express';
import multer from 'multer';
import { existsSync } from 'fs';

const uploadDir = './src/main/uploads/';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const tmpName = uploadDir + file.originalname
        if (!existsSync(file.originalname)) {
            cb(null, file.originalname)
        }
    },
    filename: function (req, file, cb) {
        // const tmpName = uploadDir + file.originalname
        if (!existsSync(file.originalname)) {
            // console.log(file.originalname);
            cb(null, file.originalname)
        }
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })



const server = express();


server.get("/", (req, res) => {
    res.send("ciao");
})

server.post("/", upload.single("data"), (req, res) => {
    
        if(!existsSync(tmpName)){
           res.sendStatus(200)
          }else{
            res.sendStatus(400)
          }
})


export default server;
import https from 'https'
// import dotenv from 'dotenv'
import axios from "axios";
import  {VITE_CASHMATIC_PORT, VITE_CASHMATIC_PROTOCOL, VITE_CASHMATIC_SERVER_IP}  from '../constants'

// dotenv.config()

class Base {

    constructor() {
        // default value
        this.DEFAULT_REASON = "DEFAULT_REASON"
        this.DEFAULT_REFERENCE = "DEFAULT_REFERENCE"

        // server data
        this.PORT = VITE_CASHMATIC_PORT;
        this.PROTOCOL = VITE_CASHMATIC_PROTOCOL;
        this.SERVER_IP = VITE_CASHMATIC_SERVER_IP;

        this.HOST = `${this.PROTOCOL}://${this.SERVER_IP}:${this.PORT}`;

        // // Creazione di un'istanza di un agente HTTPS con una gestione personalizzata dei certificati
        // Creazione di un'istanza di Axios con l'agente HTTPS personalizzato
        this.agent = new https.Agent({
            rejectUnauthorized: false, // Ignora la validazione del certificato (equivalente a DangerousAcceptAnyServerCertificateValidator)
            requestCert: false
        })
    }
    // get authorized client to skip SSL certificate check
    async _authorizedClient(token) {
        return axios.create({
            httpsAgent: this.agent,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    // req with object
    async _objectedReq(token, obj, endpoint) {


        const req = this.HOST + endpoint;


        const httpClient = await this._authorizedClient(token)
        return new Promise((resolve, reject) => {
            httpClient.post(
                req, obj
            ).then(res => {
                resolve(res.data)
            }).catch(err => reject(err))
        })
    }
    // base req with just token
    async _simpleReq(token, endpoint) {
        if (!token) throw new Error("token is required")
        const req = this.HOST + endpoint;

        const httpClient = await this._authorizedClient(token)
        return new Promise((resolve, reject) => {
            httpClient.post(
                req,
            ).then(res => {
                resolve(res.data)
            }).catch(err => reject(err))
        })
    }


}


export default Base;
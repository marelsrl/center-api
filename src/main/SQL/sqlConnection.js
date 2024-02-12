import sql from 'mssql';

const USER="bizerba"
const PASS="desio172"
const SERVER="server\\MSSQLSERVER"
const DATABASE="MultiTraceConnect"


var config = {
    user: USER,
    password: PASS,
    server: SERVER,
    database: DATABASE,
    trustServerCertificate: true // per il certificato ssl autofirmato
};

export {
    sql,config
}
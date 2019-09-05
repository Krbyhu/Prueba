const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const db = mysql.createPool(database);


db.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code == 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('DB is connected');
    return;
})

//PROMISIFY POOL QUERYS
db.query = promisify(db.query);

module.exports = db;
const db = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const conn = db.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    dateStrings : true
});

module.exports = conn;
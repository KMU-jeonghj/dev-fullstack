const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');

const {StatusCodes} = require('http-status-codes');



const getAllCategory = (req, res) => {

    let sql = "SELECT * FROM category";
    conn.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.OK).json(results);
        }
    })

};



module.exports = {
    getAllCategory
};
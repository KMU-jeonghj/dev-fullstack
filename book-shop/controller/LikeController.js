const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');

const {StatusCodes} = require('http-status-codes');


const addLike = (req, res) => {
    //좋아요 추가

    let {id} = req.params;
    id = parseInt(id);
    const {user_id} = req.body;

    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);";
    let vaules = [user_id, id];

    conn.query(sql, vaules, 
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        }
    )
};

const removeLike = (req, res) => {

};



module.exports = {
    addLike,
    removeLike
};
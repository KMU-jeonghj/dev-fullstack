const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();    
const cookie = require('cookie');
const {StatusCodes} = require('http-status-codes');


const addLike = (req, res) => {
    //좋아요 추가

    let {id} = req.params;
    id = parseInt(id);
    //const {user_id} = req.body;

    // let receivedJwt = req.headers['authorization'];
    // console.log(receivedJwt);
    // if (!receivedJwt) {
    //     return res.status(401).json({ message: "No token provided" });
    //   }
    //   const token = receivedJwt.split(' ')[1]; // 'Bearer' 제거
    let authorization = ensureAhthorization(req, res);

    let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?);";
    let vaules = [authorization.id, id];
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

function ensureAhthorization(req, res) {
    let receivedJwt = req.headers['authorization'];
    console.log(receivedJwt);
    if (!receivedJwt) {
        return res.status(401).json({ message: "No token provided" });
      }
      const token = receivedJwt.split(' ')[1]; // 'Bearer' 제거
    let decodedUser = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedUser);
    return decodedUser;
}

const removeLike = (req, res) => {

    let {id} = req.params;
    book_id = parseInt(id);

    let receivedJwt = req.headers['authorization'];
    console.log(receivedJwt);
    if (!receivedJwt) {
        return res.status(401).json({ message: "No token provided" });
      }
      //const token = receivedJwt.split(' ')[1]; // 'Bearer' 제거
    let decodedUser = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedUser);
    let authorization = ensureAhthorization(req , res);

    let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?;";
    let vaules = [authorization.id, book_id];


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



module.exports = {
    addLike,
    removeLike
};
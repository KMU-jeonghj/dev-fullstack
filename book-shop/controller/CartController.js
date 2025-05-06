const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const {StatusCodes} = require('http-status-codes');


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



const addToCart = (req, res) => {

    const {book_id, quantity } = req.body;
    let authorization = ensureAhthorization(req, res);

    let sql = "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (? ,?, ?);"
    let values = [book_id, quantity, authorization.id];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            return res.status(StatusCodes.OK).json(results);
        }
    )

};

const getCartItems = (req, res) => {

    const {selected} = req.body;

    let authorization = ensureAhthorization(req, res);
    let user_id = authorization.id;


    let sql = `SELECT cartItems.id, book_id, title, summary, quantity, price 
                FROM cartItems LEFT JOIN books 
                ON cartItems.book_id = books.id
                WHERE user_id=?`;

    let values = [user_id];

    if (selected) {
        sql += " AND cartItems.id IN (?)";
        values.push(selected);
    }
    sql += ";";
    
    conn.query(sql, values, 
        (err, results)=> {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })

};

const removeCartItem = (req, res) => {

    const cartItemId = req.params.id;

    let sql = "DELETE FROM cartItems WHERE id = ?;";
    conn.query(sql, cartItemId,
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
    addToCart,
    getCartItems,
    removeCartItem
};
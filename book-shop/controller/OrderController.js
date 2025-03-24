//const conn = require('../db');
const db = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();


const order = async (req, res) => {
    const conn = await db.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : 'Bookshop',
        port : 33062,
        dateStrings : true
    });

    const {items, delivery, totalQuantity, totalPrice, userId, firstBookTitle} = req.body;


    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?);`
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.execute(sql, values);

    let delivery_id = results.insertId;

    //order 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
            VALUES (?, ?, ?, ?, ?);`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await conn.execute(sql, values);

    let order_id = results.insertId;

    // items 으로 -> book_id, quantity 조회
    sql = `SELECT book_id, quantity FROM cartItems WHERE IN (?)`;
    let [orderItems, fields] = await conn.query(sql, [items]);

    //orderedBook 테이블 삽입
    sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;

    values = [];
    orderItems.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity]);
    });
    results = await conn.query(sql, [values]);

    let del = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(results[0]);

};

const deleteCartItems = async (conn, items) => {
    let sql = "DELETE FROM cartItems WHERE id IN (?);";

    let results = await conn.query(sql, [items]);
    return results;
}


const getOrders = async (req, res) => {
    const conn = await db.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : 'Bookshop',
        port : 33062,
        dateStrings : true
    });

    let sql = `SELECT orders.id, created_at, book_title, total_quantity, total_price,
                address, receiver, contact
                FROM orders LEFT JOIN delivery
                ON orders.delivery_id = delivery.id;`;

    let [rows, fields] = await conn.query(sql);
    return res.status(StatusCodes.OK).json(rows);

};

const getOrderDetail = async (req, res) => {

    const {id} = req.params;

    const conn = await db.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : 'Bookshop',
        port : 33062,
        dateStrings : true
    });

    let sql = `SELECT book_id, title, author, price, quantity
                FROM orderedBook LEFT JOIN books
                ON orderedBook.book_id = books.id
                WHERE order_id = ?`;

    let [rows, fields] = await conn.query(sql, [id]);
    return res.status(StatusCodes.OK).json(rows);

};



module.exports = {
    order,
    getOrders,
    getOrderDetail
};
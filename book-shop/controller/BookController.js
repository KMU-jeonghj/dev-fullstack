const conn = require('../db');
const { Result } = require('express-validator');
const { StandardValidation } = require('express-validator/lib/context-items');

const {StatusCodes} = require('http-status-codes');




//(카테고리별, 신간 여부)전체 도서 조회
const getAllBooks = (req, res) => {

    let {category_id, newBooks, limit, currentPage } = req.query;
    // LIMIT → 출력할 행의 수
    // OFFSET  → 시작 지점
    // -> offset -> limit * (currentPage-1)
    let offset = limit * (currentPage-1);

    limit = parseInt(limit);
    offset = parseInt(offset);
    

    let sql = "SELECT *, (SELECT count(*) FROM likes WHERE likes.liked_book_id = books.id) AS likes FROM books";
    let values= [];

    if (category_id && newBooks) {
        category_id = parseInt(category_id);
        sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
        values = values.push(category_id);
    }
    else if (category_id) {
        category_id = parseInt(category_id);
        sql += " WHERE category_id=?";
        values = values.push(category_id);

    }
    else if (newBooks) {
        sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    
    }

    sql += " LIMIT ? OFFSET ?;";
    values.push(limit, offset);

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length)
                return res.status(StatusCodes.OK).json(results);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        }
    )

};

//개별 도서 조회
const getBook = (req, res) => {

    let {user_id} = req.body;
    let book_id = req.params.id;
    //id = parseInt(id);


    //books.id , category.id 중복 문제 AS 별명 지어주기!
    let sql = `SELECT books.*,
                (SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes, 
                (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked,
                category.category_name
                FROM books 
                LEFT JOIN category 
                ON books.category_id = category.id
                WHERE books.id=?;`;

    let values = [user_id, book_id, book_id];

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results[0])
                return res.status(StatusCodes.OK).json(results[0]);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        }
    )
};



module.exports = {
    getAllBooks,
    getBook
};
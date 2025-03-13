const conn = require('../db');
const { Result } = require('express-validator');

const {StatusCodes} = require('http-status-codes');




//전체 도서 조회
const getAllBooks = (req, res) => {
    
    let sql = "SELECT * FROM books";

    conn.query(sql, (err, results)=> {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
};

//개별 도서 조회
const getBook = (req, res) => {

    let {id} = req.params;
    //id = parseInt(id);

    let sql = "SELECT * FROM books WHERE id = ?";
    conn.query(sql, id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results[0])
                return res.status(StatusCodes.OK).json(results);
            else
                return res.status(StatusCodes.NOT_FOUND).end();
        }
    )
};

//카테고리별 도서 목록 조회
const getBookByCategory = (req, res) => {

};



module.exports = {
    getAllBooks,
    getBook,
    getBookByCategory
};
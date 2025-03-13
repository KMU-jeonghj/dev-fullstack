const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBook,
    getBookByCategory
} = require('../controller/BookController');

router.use(express.json());

//전체도서 조회
router.get('/', getAllBooks);

//개별도서 조회
router.get('/:id', getBook);

//카테고리 별 도서 목록 조회
router.get('/', getBookByCategory);




module.exports = router
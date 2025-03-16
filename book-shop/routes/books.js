const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBook
} = require('../controller/BookController');

router.use(express.json());



//전체도서 조회
router.get('/', getAllBooks);

//개별도서 조회
router.get('/:id', getBook);





module.exports = router
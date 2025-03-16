const express = require('express');
const router = express.Router();

const {
    getAllCategory
} = require('../controller/CategoryController');

router.use(express.json());

router.get('/', getAllCategory);

module.exports = router
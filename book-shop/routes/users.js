const express = require('express');
const router = express.Router();

const conn = require('../db');
const { Result } = require('express-validator');

const {StatusCodes} = require('http-status-codes');

router.use(express.json());

const {join} = require('../controller/UserController');


//회원가입
router.post('/join', join);

//로그인
router.post('/login');

// 비밀번호 초기화 요청
router.post('/reset');

//비밀번화 초기화
router.put('/reset');


module.exports = router
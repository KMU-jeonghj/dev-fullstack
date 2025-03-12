const express = require('express');
const router = express.Router();

const conn = require('../db');
const { Result } = require('express-validator');

const {StatusCodes} = require('http-status-codes');

router.use(express.json());

const {join,
      login,
      requestPasswordReset, 
      resetPassword} = require('../controller/UserController');


//회원가입
router.post('/join', join);

//로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', requestPasswordReset);

//비밀번화 초기화
router.put('/reset', resetPassword);


module.exports = router
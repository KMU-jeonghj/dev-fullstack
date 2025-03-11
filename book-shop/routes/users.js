const express = require('express');
const router = express.Router();

router.use(express.json());

//회원가입
router.post('/join', (req, res) => {
    res.json("join");
});
//로그인
router.post('/login')
// 비밀번호 초기화 요청
router.post('/reset')
//비밀번화 초기화
router.put('/reset')


module.exports = router
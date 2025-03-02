
const express = require('express')
const router = express.Router()
const conn = require('../db')


router.use(express.json())

//로그인
router.post('/login', function(req, res) {
    
    const {email, password} = req.body

    conn.query(
        "SELECT * FROM users WHERE email = ?", email,
        function(err, results, fields) {
            let loginUser = results[0]
            //email db에 있는지 확인 , 유효성
            if (loginUser && loginUser.password === password) {
                
                res.status(200).json({
                    message : `${loginUser.name} 로그인 완료`
                })
                
            } else if (loginUser && loginUser.password !== password) {
                res.status(400).json({
                    message : "password is not correct"
                })
            } else {
                res.status(404).json({
                    message : "no user"
                })
            }
        }
    )
})


//회원가입
router.post('/join', function (req, res) {
    let b = req.body
    if (b == {}) {
        res.status(400).json({
            message : "다시 입력 ㄱㄱ"
        })
        
    } else {
        const {email, name, password, contact} = req.body

        conn.query(
            "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)",
            [email, name, password, contact]
        )

        res.status(201).json({
        message : `${name} 님 환영환영`
        })
    }     
})

router
    .route('/users')
    .get(function(req,res) {

        let {email} = req.body

        conn.query(
            "SELECT * FROM users WHERE email = ?", email ,
            function(err, results, fields) {
                if (results.length) {
                    res.status(200).json(results)
                } else {
                    res.status(404).json({
                        message : "no user"
                    })
                }
            }
        )
    })
    .delete(function(req,res) {
        const {email} = req.body

        conn.query(
            "DELETE FROM users WHERE email = ?", email,
            function (err, results, fields) {
                res.status(200).json(results)
            }
        )       
    })


module.exports = router
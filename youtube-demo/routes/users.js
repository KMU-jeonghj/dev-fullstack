
const express = require('express')
const router = express.Router()
const conn = require('../db')
const {body, param, validationResult} = require('express-validator') 

//jwt
const jwt = require('jsonwebtoken')
//env
const dotenv = require('dotenv')
dotenv.config()


router.use(express.json())


const validate = (req, res, next) => {
    const err = validationResult(req)

        if (err.isEmpty()) {
            return next();
        } 
        else {
            //예외처리
            console.log(err.array())
            return res.status(400).json(err.array())
        }
}



//로그인
router.post(
    '/login', 
    [
        body('email').notEmpty().isEmail().withMessage("이메일 형식이 잘못되었습니다."),
        body('password').notEmpty().isString().withMessage("비밀번호가 잘못되었습니다."),
        validate
    ] ,
    function(req, res, next) {
    
        const {email, password} = req.body

        conn.query(
            "SELECT * FROM users WHERE email = ?", email,
            function(err, results, fields) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                let loginUser = results[0]
                //email db에 있는지 확인 , 유효성
                if (loginUser && loginUser.password === password) {
                    
                    //요기서 토큰 발급!
                    const token = jwt.sign({
                        email : loginUser.email,
                        name : loginUser.name
                    }, process.env.PRIVATE_KEY, {
                        expiresIn : '30m',
                        issuer : "me"
                    })

                    //cookie 보내기
                    res.cookie("token", token, {
                        httpOnly : true
                    })

                    
                    
                    res.status(200).json({
                        message : `${loginUser.name} 로그인 완료`
                    })
                    
                } else if (loginUser && loginUser.password !== password) {
                    res.status(403).json({
                        message : "password is not correct"
                    })
                } else {
                    res.status(403).json({
                        message : "no email"
                    })
                }
            }
        )
})


//회원가입
router.post(
    '/join', 
    [
        body('email').notEmpty().isEmail().withMessage("이메일 형식이 잘못되었습니다."),
        body('name').notEmpty().isString().withMessage("이름 입력 에러"),
        body('password').notEmpty().isString().withMessage("비밀번호가 잘못되었습니다."),
        body('contact').notEmpty().isString().withMessage("전화번호가 잘못 됨"),
        validate
    ], 
    function (req, res, next) {

        
        const {email, name, password, contact} = req.body

        conn.query(
            "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)",
            [email, name, password, contact]
        )

        res.status(201).json({
        message : `${name} 님 환영환영`
        })
            
})

router
    .route('/users')
    .get( //회원 개별 조회
        [
            body('email').notEmpty().isEmail().withMessage("이메일 형식이 잘못되었습니다."),
            validate
        ],
        function(req, res, next) {

            let {email} = req.body

            conn.query(
                "SELECT * FROM users WHERE email = ?", email ,
                function(err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }
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
    .delete( // 회원 탈퇴
        [
            body('email').notEmpty().isEmail().withMessage("이메일 형식이 잘못되었습니다."),
            validate
        ],
        function(req,res,next) {
            const {email} = req.body

            conn.query(
                "DELETE FROM users WHERE email = ?", email,
                function (err, results, fields) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }

                    if (results.affectedRows == 0) {
                        return res.status(400).end()
                    } 
                    else {
                        res.status(200).json(results)
                    }
                }
            )       
    })


module.exports = router
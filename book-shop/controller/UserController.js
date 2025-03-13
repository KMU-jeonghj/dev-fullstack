const conn = require('../db');
const { Result } = require('express-validator');

const {StatusCodes} = require('http-status-codes');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



const join = (req, res) => {

    const {email, password} = req.body;

    //비밀번호 암호화
    const salt = crypto.randomBytes(64).toString('base64'); //소금뿌리기
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

    let sql = "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
    let values = [email, hashedPassword, salt];

    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
            }

            return res.status(StatusCodes.CREATED).json(results);
        }
    )  
};

//login
const login = (req, res) => {
    const {email, password} = req.body;

    let sql = "SELECT * FROM users WHERE email = ?";
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST
            }

            const loginUser = results[0];

            //조건문 수정 필요, 이메일이 틀리면?
            const hashedPassword = 
            crypto.pbkdf2Sync(password, loginUser.salt, 10000, 64, 'sha512').toString('base64');



            if (loginUser && loginUser.password == hashedPassword) {

                //토큰 발행
                const token = jwt.sign({
                    email : loginUser.email
                }, process.env.PRIVATE_KEY, {
                    expiresIn : '5m',
                    issuer : 'user'
                });

                // cookie 에 토큰 담기
                res.cookie("token", token, {
                    httpOnly : true
                });
                console.log(token);

                return res.status(StatusCodes.OK).json(results);
            }
            else {
                return res.status(StatusCodes.UNAUTHORIZED).end();  // 401 : unauthorized, 비인증
            }
        }
    )
};


const requestPasswordReset = (req, res) => {
    const {email} = req.body;

    let sql = "SELECT * FROM users WHERE email = ?";

    conn.query(sql, email,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            const user = results[0];
            if (user) {
                return res.status(StatusCodes.OK).json({
                    email : email
                });
            }
            else {
                return res.status(StatusCodes.UNAUTHORIZED).end();
            }
        }
    )
};


const resetPassword = (req, res) => {
    const {email, password} = req.body;

    let sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";

    //비밀번호 암호화
    const salt = crypto.randomBytes(64).toString('base64'); //소금뿌리기
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

    let values = [hashedPassword, salt, email];
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.affectedRows === 0)
                return res.status(StatusCodes.BAD_REQUEST).end();
            else
                return res.status(StatusCodes.OK).json(results);
        }
    )
};



module.exports = {join, login, requestPasswordReset, resetPassword};

const express = require('express')
const conn = require('../db')
const { body, param, validationResult } = require('express-validator')
const router = express.Router()

router.use(express.json())

//미들웨어? -> 우리가 남이가?
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


router
    .route('/')
    .get(
        [
            body('userId').notEmpty().isInt().withMessage('id는 숫자를 입력해야 합니다.'),
            validate
        ],
        (req, res, next) => {


        let {userId} = req.body

        sql = "SELECT * FROM channels WHERE user_id = ?"

        conn.query(sql, userId,
            function(err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                if (results.length) {
                    res.status(200).json(results)
                }
                else {
                    res.status(404).json({
                        message : "NOT FOUND"
                        })
                }
                
            }
        )
        
        
        
    }) //전체 조회

    .post(
        //userId, name 유효성 검사
        [
            body('userId').notEmpty().isInt().withMessage('id는 숫자를 입력해야 합니다.'),
            body('name').notEmpty().isString().withMessage("이름에 문자를 입력해주세요"),
            validate   
        ],
        (req, res, next) => {
            

            const {name, userId} = req.body

            let sql = "INSERT INTO channels (name, user_id) VALUES (?, ?)"
            let values = [name, userId]
            conn.query(sql, values,
                function(err, results) {
                    if(err) {
                        console.log(err)
                        return res.status(400).end()
                    }
                    
                    res.status(201).json(results)
                }
            )
        
        
    }) // 개별 생성


router
    .route('/:id')
    .get(
        [
            param('id').notEmpty().withMessage('id 필요'),
            validate
        ]
        ,(req, res, next) => {
           

            let {id} = req.params
            id = parseInt(id)

            let sql = "SELECT * FROM channels WHERE id = ?"
            conn.query(sql,id,
                function(err, results) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }

                    if (results.length)
                        res.status(200).json(results)
                    else
                        res.status(404).json({
                        message : "NOT FOUND"
                        })
                }
            )   
    }) // 개별 조회

    .put(
        [
            param('id').notEmpty().withMessage('id 필요'),
            body('name').notEmpty().isString().withMessage("name error"),
            validate
        ]
        ,(req, res, next) => {


            let {id} = req.params
            id = parseInt(id)
            let {name} = req.body

            sql = "UPDATE channels SET name = ? WHERE id =?"
            let values = [name, id]

            conn.query(sql, values,
                function(err, results) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }

                    //update 안됐을 때
                    if (results.affectedRows == 0) {
                        return res.status(400).end()
                    } else {
                        res.status(200).json(results)
                    }

                }
            )

            
        
    }) // 개별 수정

    .delete(
        [
            param('id').notEmpty().withMessage('id 필요'),
            validate
        ]
        ,(req, res, next) => {

            

        let {id} = req.params
        id = parseInt(id)

        let sql = "DELETE FROM channels WHERE id = ?"
        conn.query(sql, id,
            function(err, results) {
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

        
    }) // 개별 삭제


    module.exports = router
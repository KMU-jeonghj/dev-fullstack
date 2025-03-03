
const express = require('express')
const conn = require('../db')
const router = express.Router()

let db = new Map()
let idCounter = 1

router
    .route('/')
    .get((req, res) => {
        let {userId} = req.body
        let channels = []

        sql = "SELECT * FROM channels WHERE user_id = ?"

        if (userId) {
            conn.query(sql, userId,
                function(err, results) {
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
        }
        else {
            //id 없으면 400 응답
            res.status(400).end()
        }
        
        
    }) //전체 조회

    .post((req, res) => {
        const {name, userId} = req.body

        if (name && userId) {

            let sql = "INSERT INTO channels (name, user_id) VALUES (?, ?)"
            let values = [name, userId]
            conn.query(sql, values,
                function(err, results) {
                    res.status(201).json(results)
                }
            )
            
        } else {
            res.status(400).json({
                message :" 요청 값을 제대로 보내세용"
            })
        }
    
    }) // 개별 생성


router
    .route('/:id')
    .get((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        let sql = "SELECT * FROM channels WHERE id = ?"
        conn.query(sql,id,
            function(err, results) {
                if (results.length)
                    res.status(200).json(results)
                else
                    res.status(404).json({
                    message : "NOT FOUND"
                    })
            }
         )   
    }) // 개별 조회

    .put((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        let channel = db.get(id)
        let original = channel

        if (channel) {
            let newTitle = req.body.channelTitle

            channel.channelTitle = newTitle
            db.set(id, channel)

            res.status(200).json({
                message : `${original.channelTitle} -> ${newTitle}`
            })
        } else {
            res.status(404).json({
                message : "NOT FOUND"
            })
        }
        
    }) // 개별 수정

    .delete((req, res) => {
        let {id} = req.params
        id = parseInt(id)

        let channel = db.get(id)
        if (channel) {
            db.delete(id)

            res.status(200).json({
                message : `${channel.channelTitle} 삭제완료`
            })
        } else {
            res.status(404).json({
                message : "NOT FOUND"
            })
        }
    }) // 개별 삭제


    module.exports = router
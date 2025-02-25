
const express = require('express')

const router = express.Router()

let db = new Map()
let idCounter = 1

router
    .route('/')
    .get((req, res) => {
        let {userId} = req.body
        let channels = []
        
        
        if (db.size && userId) {
            
            db.forEach(function (value, key) {
                if (value.userId === userId) {
                    channels.push(value)
                }
            })

            if (channels.length === 0) {
                res.status(404).json({
                    message : "no channel"
                })
            } else {
                res.status(200).json(channels)
            } 

        } else {
            res.status(404).json({
                message : "db is empty"
            })
        }

        


    }) //전체 조회

    .post((req, res) => {
        if (req.body.channelTitle) {

            const {channelTitle} = req.body
            db.set(idCounter++, req.body)

            res.status(201).json({
            message : `${channelTitle} 채널이 생성되었습니다.`
        })
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

        if (db.get(id) == undefined) {
            res.status(404).json({
                message : "NOT FOUND"
            })
        } else {
            res.status(200).json(db.get(id))
        }
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
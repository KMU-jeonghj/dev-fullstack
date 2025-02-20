
const express = require('express')
const app = express()
app.listen(8889)


let db = new Map()
let idCounter = 1

app.use(express.json())

//로그인
app.post('/login', function(req, res) {

})

//회원가입
app.post('/join', function (req, res) {
    let b = req.body
    if (b == {}) {
        res.status(400).json({
            message : "다시 입력 ㄱㄱ"
        })
        
    } else {
        db.set(idCounter++, req.body)

        res.status(201).json({
        message : `${db.get(idCounter-1).name} 님 환영환영`
        })
    } 
    
})

//회원 개별 조회
app.get('/users/:id', function (req, res) {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)
    if (user) {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    } else {
        res.status(404).json({
            message : "회원 정보 없음,"
        })
    }

})

// 회원 개별 탈퇴
app.delete('/user/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    const user = db.get(id)

    if (user) {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 ㅂㅂ`
        })

    } else {
        res.status(400).json({
            message : "회원 정보 없음"
        })
    }

})
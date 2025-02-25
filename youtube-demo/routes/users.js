
const express = require('express')
const router = express.Router()


let db = new Map()
let idCounter = 1

router.use(express.json())

//로그인
router.post('/login', function(req, res) {
    
    //request 의 id 가 db에 있는지 확인
    const {userId, password} = req.body

    let loginUser = {}

    let idFlag = false
    let pwdFlag = false

    db.forEach(function(user, id) {
        if (user.userId === userId) {
            idFlag = true
            loginUser = user

        } 
    })

    if (isEmpty(loginUser)) {
        //db  에서 못찾음
        res.status.json({
            message : "id를 찾지 못했습니다."
        })
        
    } else {
        if (loginUser.password === password) {
            res.json({
                message : `${loginUser.name} 로그인됨`
            })
        } else {
            res.status(400).json({
                message : "password is not correct"
            })
        
    }
}

})


function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false
    }
}




//회원가입
router.post('/join', function (req, res) {
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

router
    .route('/users')
    .get(function(req,res) {

        let {userId} = req.body
        
        const user = db.get(id)
        if (user === undefined) {
            res.status(404).json({
                message : "no users"
            })
        } else {
            res.status(200).json({
                userId : user.userId,
                name : user.name
            })
        }
    })
    .delete(function(req,res) {
        let {userId} = req.body

        const user = db.get(userId)
        if (user) {
            db.delete(id)

            res.status(200).json({
                message : `${user.name} 바이바이`
            })
        } else {
            res.status(404).json({
                message : "no user"
            })
        }
    })


module.exports = router
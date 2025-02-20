const express = require('express');
const app = express();


app.listen(8889);

app.get('/', function(req, res) {
    res.send('Hello World');
});






let user1 = {
    title : "chimchakman",
    sub : "227",
    videoNum : '6000'
}

let user2 = {
    title : "PTAJ",
    sub : "6000",
    videoNum : '30'
}


let db = new Map();
let idCounter = 1
db.set(idCounter++, user1);
db.set(idCounter++, user2);
//db.set(3, user3);




//api
app.get('/users/:id', function (req, res) {
    let {id} = req.params;
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined) {
        res.status(404).json({
            message : "no data"
        })
    } else {
        res.json(user)
    }
})

app.get('/users', function (req, res) {
    if (db.size === 0) {
       
        res.status(404).json({
            message : "not found"
        })
        
    } else {
        let users = {}
        db.forEach(function (v, k) {
            users[k] = v
            });
        res.json(users)
    }
    
})



app.use(express.json()) // http 외 모듈(미들웨어) 설정
app.post('/users', function (req, res) {
    
    if(req.body.title) {
        let body = req.body
        db.set(idCounter++, body)

        res.json({
        message : `${db.get(idCounter-1).title}  , hello!`
    })
    }
    else {
        res.status(400).json({
            message: "CANNOT FIND REQUEST BODY VALUE"
        })
    }

    
})




app.delete('/users/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    let user = db.get(id)
    if (user == undefined) {
        res.json({
            message : "not found"
        })
    } else {
        db.delete(id)
        res.json({
            message : `${user.title}, bye~`
        })
    }

})


app.delete('/users', function (req, res) {

    let msg = ""
    if (db.size == 0) {
       
        res.status(404).json({
            message : "not found"
        })
        
    }
    else {
        db.clear()
        
        msg = "db is cleared"
        
    }

    res.json({
        message : msg
    })
})





app.put('/users/:id', function (req, res) {
    let {id} = req.params
    id = parseInt(id)

    let user = db.get(id)
    let preTitle = user.title
    if (user == undefined) {
        res.json({
            message : `cannot find user${id}`
        })
    } else {
        let title = req.body.title
        let sub = req.body.sub
        let videoNum = req.body.videoNum
        user.title = title
        user.sub = sub
        user.videoNum = videoNum
        
        db.set(id, user)
        res.json({
            message : `${preTitle} -> ${title}`
        })
    }
})
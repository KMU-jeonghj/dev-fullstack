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
app.get('/user/:id', function (req, res) {
    let {id} = req.params;
    id = parseInt(id)

    const user = db.get(id)
    if(user == undefined) {
        res.json({
            message : "no data"
        })
    } else {
        res.json(user)
    }
})

app.get('/users', function (req, res) {
    let users = {}
    db.forEach(function (v, k) {
        users[k] = v
    });
    res.json(users)
})



app.use(express.json()) // http 외 모듈(미들웨어) 설정
app.post('/user', function (req, res) {
    
    console.log(req.body)
    //res.json(req.body)

    let body = req.body
    db.set(idCounter++, body)

    res.json({
        message : `${db.get(idCounter-1).title}  , hello!`
    })
})
//db 개수 알기
const express = require('express');
const app = express();

app.listen(8889);


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/:key', function(req, res) {
    let {key} = req.params; // 비구조화 이유?
    console.log(key);

    // 정수로 변환이 불가능한 경우 예외 처리
    if (isNaN(key) || key.includes('.')) {
        return res.json({
            message: "Invalid ID format"
        });
    }

    key = parseInt(key); // int 부분을 parse한다 -> 파라마터에 정수와 문자열
    let value = db.get(key);
    value.id = key; // 객체에 값 추가 | value["id"] = id;

    if (value == undefined) {
        res.json({
            message : "no id"
        })
    }
    else {
        res.json(value);
    }
    
})


let db = new Map();

let book = {
    product : "book",
    price : 20000
}

let cup = {
    product : "cup",
    price : 10000
}


let jelly = {
    product : "jelly",
    price : 1600
}

db.set(1, book);
db.set(2, cup);
db.set(3, jelly);


console.log(db);
console.log(db.get(1));
const express = require('express');
const app = express();

app.listen(8889);


app.get('/products/:n', function(req, res) {
    //procuct/ 뒤 값 변수 n 에 할당
    let number = req.params.n;
    res.json({
        num : number
    });
});

app.get('/:nickname', function(req, res) {

    const param = req.params;

    res.json({
        channel : param.nickname
    })
});


//https://www.youtube.com/watch?v=HKZaGzpnclw&t=103s

app.get('/watch', function(req, res) {
    // const q = req.query;
    //객체 비구조화
    const {v, t} = req.query;


    // res.json(q);
    res.json({
        video : v,
        timeline : t
    })
})
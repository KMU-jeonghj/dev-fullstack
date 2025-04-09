const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

var jwt = require('jsonwebtoken'); //jwt 모듈 불러오기

app.get('/', function (req, res) {
    var token = jwt.sign({foo : 'bar'}, process.env.PRIVATE_KEY);

    res.cookie("jwt", token, {
        httpOnly : true
    });
    res.send("token !!")
});

app.listen(8889);
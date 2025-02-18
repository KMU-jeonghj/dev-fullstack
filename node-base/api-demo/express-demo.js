const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/test', function(req, res) {
    res.send({
        test : 'test'
    });
});

let book = {
    title : "Node.js",
    price : 20000,
    description : "~~~~"
}


app.get('/products/1', function(req, res) {
    res.json(book);
});


app.listen(8889);
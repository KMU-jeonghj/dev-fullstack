const express = require('express');
const app = express();

app.listen(8889);


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



app.get('/:nickname', function(req, res) {

    const {nickname} = req.params;

    if (nickname == "chimchakman") {
        res.json(user1);
    } else if (nickname == "ptaj") {
        res.json(user2);
    } else {
        //예외처리
        res.json({
            message : "unknown"
        })
    }
});



const express = require('express')
const app = express()
app.listen(8889)


const fruits = [
    { id : 1, name : "apple" },
    { id : 2, name : "orange" },
    { id : 3, name : "strawberry" },
    { id : 4, name : "blueberry" }
]


app.get('/fruits', function (req, res) {
    res.json(fruits)
})


app.get('/fruits/:id', (req, res) => {
    let id = req.params.id
    //find 함수
    let fruit = fruits.find(f => f.id == id)
    
    if (fruit) res.json(fruit)
    else {
        res.status(404).send(
            "NOT FOUND"
        )
    }

    
})
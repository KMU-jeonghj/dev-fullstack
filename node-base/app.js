const express = require('express')
const app = express()
const port = 8889


app.get('/', (req, res)=> {
    res.send('Hello World')
})

app.use(express.json())
app.post('/test', function (req, res) {

    console.log(req.body.message)
    let message = req.body.message

    res.json(req.body)
})

app.listen(port)


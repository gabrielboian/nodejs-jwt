const express = require('express');
const app = express();
const userRouter = require('../routes/userRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connect our db
mongoose.connect('URL FOR MONGO DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err=>{
    if(err) console.log(err)
    else console.log('logged')
})

// bodyParser for all routes
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes for login and register
app.use('/', userRouter)

app.listen(3000)
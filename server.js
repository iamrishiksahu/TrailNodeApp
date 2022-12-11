require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path');
const {requestLogger} = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/dbConfig');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const verfyJWT = require('./middlewares/verifyJWT');

const PORT = process.env.PORT || 3300;

// Connecting to mongoDB database
connectDB()

/** Log details of every request */
app.use(requestLogger)

// builtin middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-wwww-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built-in middleware to parse json body of requests
app.use(express.json())

app.use(cookieParser())



app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/logout', require('./routes/logout'))
app.use('/products' ,(req, res) => {
    res.send({product: 'this is a product!'})
})

app.use(verfyJWT)


app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '.', 'public', '404.html'))
})

app.use(errorHandler);

// We only want to listen if there is a mongodb connection.

mongoose.connection.once('open', ()=> {


    console.log('Connected to MongoDB!');
    app.listen(PORT, () =>{
        console.log(`Server is running at ${PORT}`);
    })
})
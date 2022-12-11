const express = require('express')
const route = express.Router()
const path = require('path');


// route.get('/', (req, res) =>{
//     return res.status(200).sendFile(path.join(__dirname, '..', 'public', 'home.html'))
// })

const rootRouter = (app) => {
    app.use('/auth', require('./auth'))
    app.use('/register', require('./register'))
    app.use('/logout', require('./logout'))
    app.use('/products', (req, res) => {
        res.json({ product: 'this is a product!' })
    })

    // app.use(verfyJWT)


}


module.exports = rootRouter
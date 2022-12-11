const express = require('express')
const route = express.Router()
const path = require('path');

route.get('/', (req, res) =>{
    return res.status(200).sendFile(path.join(__dirname, '..', 'public', 'home.html'))
})
module.exports = route;
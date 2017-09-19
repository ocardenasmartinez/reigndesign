/**
  The MIT License
  Copyright (c) -2017 Max J. Tsai (mt8168@gmail.com)
**/
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Now: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('helloMax home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About helloMax')
})

module.exports = router

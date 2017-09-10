/**
  The MIT License
  Copyright (c) -2017 Max J. Tsai (mt8168@gmail.com)
**/
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {

  console.log(req.body)
  var db = req.app.get('db');
  db.collection('members').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/examples/members/')
  })

})

router.get('/', (req, res) => {

  var db = req.app.get('db');
  db.collection('members').find().toArray(function(err, result) {
  res.render('members.ejs', {members: result})
  console.log(result);
  })

})

module.exports = router

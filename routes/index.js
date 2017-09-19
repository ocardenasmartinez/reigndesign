/**
  The MIT License
  Copyright (c) -2017 Max J. Tsai (mt8168@gmail.com)
**/

/** UPDATES
 
   - 09/19/2017 -- creating route map for cleaner representation

**/

var express = require('express');
var router = express.Router();

/** Routes **/

// sample -- simple Get implementation
var helloMaxExample = require('./components/helloMaxExample');
router.use('/examples/helloMax', helloMaxExample);

// sample -- mongodb + template
var membersExample = require('./components/membersExample')
router.use('/examples/members', membersExample)

// sample -- direct embed
router.get('/homepage', function(req, res) {
  res.send('Home page')
})

module.exports = router


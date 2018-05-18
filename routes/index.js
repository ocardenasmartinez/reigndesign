var express = require('express');
var router = express.Router();
var nodejsnews = require('./components/controller')

router.use('/nodejsnews', nodejsnews);

module.exports = router

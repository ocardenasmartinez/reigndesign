var express = require('express');
var router = express.Router();

var hackersnewsService = require('./components/service')
router.use('/hackersnews', hackersnewsService);

module.exports = router

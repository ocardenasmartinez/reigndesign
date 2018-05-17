var express = require('express');
var router = express.Router();
var hackersnewsService = require('./components/controller')

router.use('/hackersnews', hackersnewsService);

module.exports = router

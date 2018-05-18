var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();
var StoryCrud = require('../../common/storyCrud');

router.delete('/', (req, res) => {
  
});

router.get('/', (req, res) => {
  const storyCrud = new StoryCrud();
  res.render('stories', {news: storyCrud.get()});
});

module.exports = router

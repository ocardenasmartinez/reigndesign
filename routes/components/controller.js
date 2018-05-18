var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();
var StoryCrud = require('../../common/storyCrud');

router.delete('/', (req, res) => {

});

router.get('/', (req, res) => {
  const storyCrud = new StoryCrud();
  storyCrud.get().then(stories => {
    res.render('stories', {news: stories});
  }, err => {
    console.log("err", err);
  });

});

module.exports = router

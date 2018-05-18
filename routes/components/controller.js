var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();
var _ = require('lodash');
var StoryCrud = require('../../common/storyCrud');
var mongo = require('mongodb-wrapper');

router.delete('/', (req, res) => {
  const requestId = req.query.documentId;
  const storyCrud = new StoryCrud();
  const filter = {
    _id: new mongo.ObjectID(requestId)
  }
  const data = {
    delete: true
  }
  storyCrud.update(filter, data).then(response => {
    console.log(response);
  }, err => {
    console.log("err", err);
  });
});

router.get('/', (req, res) => {
  const storyCrud = new StoryCrud();
  storyCrud.getAll().then(stories => {
    const storiesOut = _.sortBy(stories, function(dateObj) {
      return dateObj.created_at_i;
    });
    res.render('stories', {news: storiesOut.reverse()});
  }, err => {
    console.log("err", err);
  });

});

module.exports = router

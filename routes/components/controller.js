var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();


router.delete('/', (req, res) => {
  const db = req.app.get('db');
  const requestId = req.query.documentId;
  const documentId = new mongo.ObjectID(requestId);
  db.collection('hackersnews').remove({_id: documentId}, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

router.get('/', (req, res) => {
  var db = req.app.get('db');
  db.collection('stories').find().toArray((err, result) => {
    res.render('stories', {news: result});
  });
});

module.exports = router

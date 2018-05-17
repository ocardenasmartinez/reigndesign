var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const request = {
    news: req.body.news,
    created_at:  new Date().toLocaleString('en-US', {hour12: false})
  };
  db.collection('hackersnews').save(request, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  })
});

router.delete('/', (req, res) => {
  const db = req.app.get('db');
  const requestId = req.body.documentId;
  const documentId = new mongo.ObjectID(requestId);
  db.collection('hackersnews').remove({_id: documentId}, (err, result) => {
      if (err) return console.log(err);
      res.send(result);
  });
});

router.get('/', (req, res) => {
  var db = req.app.get('db');
  db.collection('hackersnews').find().toArray((err, result) => {
    res.render('hackersnews', {news: result});
  })
});

module.exports = router

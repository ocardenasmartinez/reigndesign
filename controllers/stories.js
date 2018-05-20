const express = require('express');
const mongo = require('mongodb-wrapper')
const router = express.Router();
const storiesHelper = require('../helpers/stories');

router.delete('/', (req, res) => {
  storiesHelper.remove(req.query.created_at_i).then(response => {
    res.status(200).send('ok');
  }, err => {
    res.status(500).send('error');
  })
});

router.get('/', (req, res) => {
  console.log(process.env.NODE_ENV);
  storiesHelper.getAll().then(stories => {
    res.render('stories', {stories: stories});
  }, err => {
    res.status(500).send('error');
  });
});

module.exports = router

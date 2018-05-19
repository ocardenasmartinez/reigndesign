const express = require('express');
const mongo = require('mongodb-wrapper')
const router = express.Router();
const storiesHelper = require('../helpers/stories-helper');

router.delete('/', (req, res) => {
  storiesHelper.remove(req.query.created_at_i).then(response => {
    console.log("story deleted");
  }, err => {
    console.log("error deleting story", err);
  })
});

router.get('/', (req, res) => {
  storiesHelper.getAll().then(stories => {
    res.render('stories', {stories: stories});
  }, err => {
    console.log("error getting stories", err);
  });
});

module.exports = router

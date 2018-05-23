const express = require('express');
const mongo = require('mongodb-wrapper')
const router = express.Router();
const storiesHelper = require('../helpers/stories');

router.delete('/', async (req, res) => {
  try {
    await storiesHelper.remove(req.query.created_at_i);
    res.status(200).send('ok');
  }catch(err) {
    res.status(500).send('error');
  }
});

router.get('/', async (req, res) => {
  try {
    const stories = await storiesHelper.getAll();
    res.render('stories', {stories});
  }catch(err) {
    console.log(err);
    res.status(500).send('error');
  }
});

module.exports = router

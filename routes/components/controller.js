var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();
var _ = require('lodash');
var StoryCrud = require('../../common/storyCrud');

router.delete('/', (req, res) => {
  const storyCrud = new StoryCrud();
  const filter = {
    created_at_i: Number(req.query.created_at_i)
  };
  const data = {
    delete: true,
    created_at_i: Number(req.query.created_at_i)
  };
  console.log("filter", filter);
  storyCrud.update(filter, data).then(response => {
    console.log(response.result);
  }, err => {
    console.log("err", err);
  });
});

router.get('/', (req, res) => {
  const storyCrud = new StoryCrud();
  storyCrud.getAll().then(stories => {
    const storiesSorted = _.sortBy(stories, function(dateObj) {
      return dateObj.created_at_i;
    });
    const storiesOut = [];
    storiesSorted.reverse().forEach((el) => {
      storiesOut.push({
        story_title: (el.story_title != null ? el.story_title : el.title),
        story_url: el.story_url,
        created_at: el.created_at,
        created_at_i: el.created_at_i,
        story_id: el.story_id,
        author: el.author
      });
    });
    res.render('stories', {news: storiesOut});
  }, err => {
    console.log("err", err);
  });

});

function setCreatedAt(date) {

}

module.exports = router

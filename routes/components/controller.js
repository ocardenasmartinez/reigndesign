var express = require('express');
var mongo = require('mongodb-wrapper')
var router = express.Router();
var _ = require('lodash');
var StoryCrud = require('../../common/storyCrud');
var moment = require('moment');

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
        created_at: setCreatedAt(el.created_at),
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

function setCreatedAt(data) {
  const format = 'MM/DD/YYYY'
  const dateIn = moment(data).format(format).toString();
  const today = moment().format(format).toString();
  const yesterday = moment(data).subtract(0, 'days').format(format).toString();
  console.log("today", today);
  var dateOut
  if(today == dateIn) {
    dateOut = moment.utc(data).format("HH:mm");
  }else if(yesterday == dateIn) {
    dateOut = "yesterday";
  } else {
    dateOut = moment.utc(data).format('MMM. D');
  }
  return dateOut;
}

module.exports = router

const _ = require('lodash');
const moment = require('moment');
const logger = require('winston');
const storiesClient = require('../middlewares/stories');
const algoliaClient = require('../middlewares/algolia');
const algoliaHelper = require('../helpers/algolia');
const format = 'MM/DD/YYYY';

var remove = id => {
  return new Promise((resolve, reject) => {
    const created_at_i = Number(id);
    const filter = {
      	created_at_i: created_at_i
    	};
    	const data = {
      	delete: true,
      	created_at_i: created_at_i
    };
    storiesClient.update(filter, data).then(response => {
      logger.log('info', 'success updating story');
    }, err => {
      logger.log('error', 'error updating story');
    });
  });
}

var getAll = () => {
  return new Promise((resolve, reject) => {
    storiesClient.getByFilter({delete: false}).then(stories => {
      const storiesOut = [];
      if(_.isEmpty(stories)) {
        algoliaHelper.populate();
        resolve(storiesOut);
      }
      const storiesSorted = _.sortBy(stories, x => {
        return x.created_at_i;
      });
      storiesSorted.reverse().forEach(el => {
        storiesOut.push({
          story_title: (el.story_title != null ? el.story_title : el.title),
          story_url: el.story_url,
          created_at: setCreatedAt(el.created_at),
          created_at_i: el.created_at_i,
          story_id: el.story_id,
          author: el.author
        });
      });
      resolve(storiesOut);
    }, err => {
      logger.log('error', 'error getting stories');
      reject(err);
    });
  });
}

function setCreatedAt(data) {
  const dateIn = moment(data).format(format).toString();
  const today = moment().format(format).toString();
  const yesterday = moment(data).subtract(0, 'days').format(format).toString();
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

module.exports = {
  getAll: getAll,
  remove: remove
}

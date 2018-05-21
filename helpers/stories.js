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
      logger.log('info', 'updating story success');
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
        algoliaHelper.populate().then(response => {
          resolve(storiesOut);
        }, err => {
          reject(error);
        });
      }
      const storiesSorted = _.sortBy(stories, story => {
        return -story.created_at_i;
      });
      storiesSorted.forEach(story => {
        storiesOut.push({
          story_title: (story.story_title != null ? story.story_title : story.title),
          story_url: story.story_url,
          created_at: setCreatedAt(story.created_at),
          created_at_i: story.created_at_i,
          story_id: story.story_id,
          author: story.author
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

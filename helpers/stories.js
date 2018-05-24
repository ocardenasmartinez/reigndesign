const _ = require('lodash');
const moment = require('moment');
const logger = require('winston');
const storiesClient = require('../middlewares/stories');
const algoliaClient = require('../middlewares/algolia');
const algoliaHelper = require('../helpers/algolia');
const format = 'MM/DD/YYYY';

let remove = async id => {
  try {
    const created_at_i = Number(id);
    const filter = {
        created_at_i: created_at_i
      };
      const data = {
        delete: true,
        created_at_i: created_at_i
    };
    await storiesClient.update(filter, data);
  }catch(err) {
    logger.log('error', 'error updating story');
  }
}

let getAll = async () => {
  try {
    const stories = await storiesClient.getByFilter({delete: false});
    const storiesOut = [];
    if(_.isEmpty(stories)) {
      await algoliaHelper();
      return storiesOut;
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
    return storiesOut;
  }catch(err) {
    throw err;
  }
}

function setCreatedAt(data) {
  const dateIn = moment(data).format(format).toString();
  const today = moment().format(format).toString();
  const yesterday = moment(data).subtract(0, 'days').format(format).toString();
  let dateOut
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

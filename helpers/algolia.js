const https = require('https');
const _ = require('lodash');
const logger = require('winston');
const storiesClient = require('../middlewares/stories');
const algoliaClient = require('../middlewares/algolia');
const Story = require('../models/story');
const dateFormat = 'DD/MM/YYYY HH:mm:ss';

var populate = () => {
  return new Promise((resolve, reject) => {
    logger.log('info', 'populating database');
    algoliaClient.getStories().then(newStories => {
      storiesClient.getByFilter({}).then(storiesDb => {
        const currentStoriesIds = _.map(storiesDb, x => {
          return x.created_at_i;
        });
        const realNewStories = _.filter(newStories, x => !_.includes(currentStoriesIds, x.created_at_i));
        realNewStories.forEach((el) => {
          var story = new Story();
          story.story_id = el.story_id;
          story.story_title = el.story_title;
          story.story_url = el.story_url;
          story.created_at = el.created_at;
          story.created_at_i = el.created_at_i;
          story.author = el.author;
          story.title = el.title;
          story.delete = false;
          storiesClient.save(story);
          logger.log('info', 'new story saved by job', JSON.stringify(story, 1, 1));
        });
      }, err => {
        logger.log('error', 'error getting stories');
      });
    }, err => {
      logger.log('error', 'error getting stories');
    });
  });
}

exports.populate = populate;
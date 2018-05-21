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
        const currentStoriesIds = _.map(storiesDb, stories => {
          return stories.created_at_i;
        });
        const realNewStories = _.filter(newStories, stories => !_.includes(currentStoriesIds, stories.created_at_i));
        realNewStories.forEach((story) => {
          var storyOut = new Story();
          storyOut.story_id = story.story_id;
          storyOut.story_title = story.story_title;
          storyOut.story_url = story.story_url;
          storyOut.created_at = story.created_at;
          storyOut.created_at_i = story.created_at_i;
          storyOut.author = story.author;
          storyOut.title = story.title;
          storyOut.delete = false;
          storiesClient.save(storyOut);
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
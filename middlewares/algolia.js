const https = require('https');
const _ = require('lodash');
const logger = require('winston');
const storiesClient = require('../middlewares/stories');
const config = require('../config/config');
const Story = require('../models/story');

var getStories = () => {
  return new Promise((resolve, reject) => {
    logger.log('info', 'getting stories from algolia');
    https.get(config.algolia.url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        var newStories = [];
        JSON.parse(data).hits.forEach((story) => {
          var storyOut = new Story();
          storyOut.story_id = story.story_id;
          storyOut.story_title = story.story_title;
          storyOut.story_url = story.story_url;
          storyOut.created_at = story.created_at;
          storyOut.created_at_i = story.created_at_i;
          storyOut.author = story.author;
          storyOut.title = story.title;
          storyOut.delete = story.delete;
          newStories.push(storyOut);
        });
        resolve(newStories);
      });
    }).on("error", err => {
      logger.log('error', 'error getting stories from algolia', err.message);
      reject(err);
    });
  });
}

exports.getStories = getStories;

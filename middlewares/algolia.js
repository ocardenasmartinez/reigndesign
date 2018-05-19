const https = require('https');
const _ = require('lodash');
const storiesClient = require('../middlewares/stories');
const config = require('../config/config');
const Story = require('../models/story');

var getStories = () => {
  return new Promise((resolve, reject) => {
    https.get(config.algolia.url, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        var newStories = [];
        JSON.parse(data).hits.forEach((el) => {
          var story = new Story();
          story.story_id = el.story_id;
          story.story_title = el.story_title;
          story.story_url = el.story_url;
          story.created_at = el.created_at;
          story.created_at_i = el.created_at_i;
          story.author = el.author;
          story.title = el.title;
          story.delete = el.delete;
          newStories.push(story);
        });
        resolve(newStories);
      });
    }).on("error", err => {
      console.log("getStories error: " + err.message);
      reject(err);
    });
  });
}

exports.getStories = getStories;

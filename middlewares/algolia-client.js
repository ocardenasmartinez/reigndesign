const https = require('https');
const _ = require('lodash');
const storiesClient = require('../middlewares/stories-client');
const config = require('../config/config');

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
          newStories.push({
            story_id: el.story_id,
            story_title: el.story_title,
            story_url: el.story_url,
            created_at: el.created_at,
            story_id: el.story_id,
            created_at_i: el.created_at_i,
            author: el.author,
            title: el.title,
            delete: false
          });
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

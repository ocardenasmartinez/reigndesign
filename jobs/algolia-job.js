var https = require('https');
var _ = require('lodash');
var storiesClient = require('../middlewares/stories-client');
var algoliaClient = require('../middlewares/algolia-client');

var execute = () => {
  console.log("executing job");
  algoliaClient.getStories().then(newStories => {
    storiesClient.getAll({}).then(storiesDb => {
      const currentStoriesIds = _.map(storiesDb, x => {
        return x.created_at_i;
      });
      const realNewStories = _.filter(newStories, x => !_.includes(currentStoriesIds, x.created_at_i));
      realNewStories.forEach((el) => {
        storiesClient.save({
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
    }, err => {
      console.log("storiesClient error", err);
    });
  }, err => {
    console.log("algoliaClient error", err);
  });
}

exports.execute = execute;
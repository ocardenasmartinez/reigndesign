const https = require('https');
const _ = require('lodash');
const moment = require('moment');
const storiesClient = require('../middlewares/stories');
const algoliaClient = require('../middlewares/algolia');
const Story = require('../models/story');
const dateFormat = 'DD/MM/YYYY HH:mm:ss';

var execute = () => {
  console.log("executing algolia job", moment().format(dateFormat).toString());
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
        console.log("new story saved: ", JSON.stringify(story, 1, 1));
      });
    }, err => {
      console.log("storiesClient error", err);
    });
  }, err => {
    console.log("algoliaClient error", err);
  });
}

exports.execute = execute;

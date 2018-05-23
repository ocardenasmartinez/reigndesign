const axios = require('axios');
const _ = require('lodash');
const logger = require('winston');
const storiesClient = require('../middlewares/stories');
const config = require('../config/config');
const Story = require('../models/story');

module.exports = async () => {
  try {
    logger.log('info', 'getting stories from algolia');
    const response = await axios.get(config.algolia.url);
    const hits = response.data.hits;
    var newStories = []
    hits.forEach(story => {
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
    return newStories;
  }catch(err) {
    logger.log('error', 'error getting stories from algolia', err);
    throw err;
  }
}

var https = require('https');
var StoryCrud = require('../common/storyCrud');
var _ = require('lodash');

class Algolia {
  executeJob() {
    var clientServerOptions = {
        uri: '',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    https.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const storyCrud = new StoryCrud()
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
        var currentStories;
        storyCrud.getAll().then(stories => {
          const currentStoriesIds = _.map(stories, x => {
            return x.created_at_i;
          });
          const realNewStories = _.filter(newStories, x => !_.includes(currentStoriesIds, x.created_at_i));
          realNewStories.forEach((el) => {
            storyCrud.save({
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
          console.log(err);
        });
      });
    }).on("error", err => {
      console.log("Error: " + err.message);
    });
  }
}

module.exports = Algolia;

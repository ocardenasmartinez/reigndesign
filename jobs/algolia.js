var https = require('https');
var StoryDao = require('../common/storyDao');
var _ = require('lodash')

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
        const storyDao = new StoryDao()
        var newStories = [];
        JSON.parse(data).hits.forEach((el) => {
          newStories.push({
            story_id: el.story_id,
            story_title: el.story_title,
            story_url: el.story_url,
            created_at: el.created_at,
            story_id: el.story_id,
            title: el.title
          });
        });
        storyDao.get().then(e => {
          console.log("e", e)
        });
        /*const currentStoriesIds = _.map(currentStories, (x) => {
          return x.story_id;
        });*/
        //console.log("currentStories", currentStories);
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
}

//;
//storyDao.save(request);

module.exports = Algolia;

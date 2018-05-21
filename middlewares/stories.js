const dbConnection = require('./database/connection.js');
const logger = require('winston');

var getByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        logger.log('info', 'getting stories from database by filter', JSON.stringify(filter));
        collection.find(filter).toArray((err, results) => {
          if(err) {
              logger.log('error', 'error getting stories from database', err);
              reject(err);
          }
          resolve(results);
        });
      });
    });
  });
};

var save = data  => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        var story = {
          story_id: data.story_id,
          story_title: data.story_title,
          story_url: data.story_url,
          created_at: data.created_at,
          story_id: data.story_id,
          created_at_i: data.created_at_i,
          author: data.author,
          title: data.title,
          delete: data.delete
        };
        collection.save(story, (err, results) => {
          if(err) {
              logger.log('error', 'error saving story in the database', err);
              reject(err);
          }
          logger.log('info', 'story saved in the database', data);
          resolve(results);
        });
      });
    });
  });
}

var update = (filter, data) => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        collection.update(filter, data, (err, results) => {
          if(err) {
              logger.log('error', 'error updating stor in the databasey', err);
              reject(err);
          }
          logger.log('info', 'story updated in the database', filter);
          resolve(results);
        });
      });
    });
  });
}

module.exports = {
  getByFilter: getByFilter,
  save: save,
  update: update
}

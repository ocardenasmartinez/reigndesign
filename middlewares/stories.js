const dbConnection = require('./database/connection.js');
const config = require('../config/config');
const logger = require('winston');

var getByFilter = async filter => {
  try {
    const databaseConnection = await dbConnection();
    const collection = await databaseConnection.collection(config.db.name);
    logger.log('info', 'getting stories from database by filter', JSON.stringify(filter));
    return await collection.find(filter).toArray();
  }catch(err) {
    logger.log('error', 'error getting stories from database', err);
    throw err;
  }
};

var save = async data => {
  try {
    const databaseConnection = await dbConnection();
    const collection = await databaseConnection.collection(config.db.name);
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
    return await collection.save(story);
  }catch(err) {
    logger.log('error', 'error saving story in the database', err);
    throw err;
  }
}

var update = async (filter, data) => {
  try {
    const databaseConnection = await dbConnection();
    const collection = await databaseConnection.collection(config.db.name);
    return await collection.update(filter, data);
  }catch(err) {
    logger.log('error', 'error updating stor in the databasey', err);
    throw err;
  }  
}

module.exports = {
  getByFilter: getByFilter,
  save: save,
  update: update
}

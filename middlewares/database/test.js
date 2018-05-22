const mongodb = require('mongo-mock');
const MongoClient = mongodb.MongoClient;
const logger = require('winston');
MongoClient.persist = "mongo.js";

module.exports = () => {
  return new Promise((resolve, reject) => {
    logger.log('info', 'conecting with the test database');
    MongoClient.connect(config.db.url, {}, function(error, databaseConnection) {
      if (error) {
        logger.log('error', 'test database error', error);
        reject(error);
      }
      resolve(databaseConnection);
    });
  });
}
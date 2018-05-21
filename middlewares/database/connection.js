const Db = require('mongodb').Db;
const Connection = require('mongodb').Connection;
const Server = require('mongodb').Server;
const config = require('../../config/config');
const logger = require('winston');
var mongodb = require('mongo-mock');
var MongoClient = mongodb.MongoClient;
MongoClient.persist="mongo.js"
var connectionInstance;

module.exports = callback => {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }else{
    if(process.env.NODE_ENV == 'prod') {
      getProduction().then(connection => {
        callback(connection);
      }, err => {
        logger.log('error', 'database error', error);
      });
    }else{
      getTest().then(connection => {
        callback(connection);
      }, err => {
        logger.log('error', 'database error', error);
      });
    }
  }
};

function getProduction() {
  return new Promise((resolve, reject) => {
    logger.log('info', 'conecting with the production database');
    var db = new Db(config.db.name, new Server(config.db.host, config.db.port, { auto_reconnect: true }));
    db.open((error, databaseConnection) => {
      if (error) {
        logger.log('error', 'production database error', error);
        reject(error);
      }
      resolve(databaseConnection);
    });
  });
}

function getTest() {
  return new Promise((resolve, reject) => {
    logger.log('info', 'conecting with the test database');
    var url = 'mongodb://localhost:27017/stories';
    MongoClient.connect(url, {}, (error, databaseConnection) => {
      if (error) {
        logger.log('error', 'test database error', error);
        reject(error);
      }
      resolve(databaseConnection);
    });
  }); 
}
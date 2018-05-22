const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const config = require('../../config/config');
const logger = require('winston');
var connectionInstance;

module.exports = callback => {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }else{
    getProduction().then(connection => {
      callback(connectionInstance = connection);
    }, err => {
      logger.log('error', 'database error', error);
    });
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
const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const config = require('../../config/config');
const logger = require('winston');

module.exports = () => {
  return new Promise((resolve, reject) => {
    logger.log('info', 'conecting with the production database');
    var server = new Server(config.db.host, config.db.port, { auto_reconnect: true }); 
    var db = new Db(config.db.test, server);
    db.open((error, databaseConnection) => {
      if (error) {
        logger.log('error', 'test database error', error);
        reject(error);
      }
      resolve(databaseConnection);
    });
  });
}

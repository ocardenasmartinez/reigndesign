const Db = require('mongodb').Db;
const Connection = require('mongodb').Connection;
const Server = require('mongodb').Server;
const config = require('../../config/config');
const logger = require('winston');
var connectionInstance;

module.exports = callback => {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }
  var db = new Db('stories', new Server(config.db.host, config.db.port, { auto_reconnect: true }));
  db.open(function(error, databaseConnection) {
    if (error) {
      logger.log('error', 'database error', error);
      throw new Error(error);
    }
    connectionInstance = databaseConnection;
    callback(databaseConnection);
  });
};

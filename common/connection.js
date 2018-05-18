var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var connectionInstance;

module.exports = function(callback) {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }
  var db = new Db('stories', new Server("127.0.0.1", 27017, { auto_reconnect: true }));
  db.open(function(error, databaseConnection) {
    if (error) throw new Error(error);
    connectionInstance = databaseConnection;
    callback(databaseConnection);
  });
};

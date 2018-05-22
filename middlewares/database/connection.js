const mongodb = require('mongo-mock');
const config = require('../../config/config');
const logger = require('winston');
const production = require('./production.js');
const test = require('./test.js');
var connectionInstance;

module.exports = callback => {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }else{
    if(process.env.NODE_ENV == 'prod') {
      production().then(connection => {
        callback(connection);
      }, err => {});
    }else{
      test().then(connection => {
        callback(connection);
      }, err => {});
    }
  }
};

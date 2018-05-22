const mongodb = require('mongo-mock');
const config = require('../../config/config');
const logger = require('winston');
const production = require('./production.js');
const test = require('./test.js');
var connectionInstance;

module.exports = async callback => {
  if (connectionInstance) {
    callback(connectionInstance);
    return;
  }else{
    if(process.env.NODE_ENV == 'prod') {
      //var prod = ;
      //console.log(prod);
      callback(await production())
      /*production().then(connection => {
        callback(connection);
      }, err => {});*/
    }else{
      test().then(connection => {
        callback(connection);
      }, err => {});
    }
  }
};

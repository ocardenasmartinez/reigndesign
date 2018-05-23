const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const config = require('../../config/config');
const logger = require('winston');
var connectionInstance;

module.exports = async () => {
  if (connectionInstance) {
    return connectionInstance;
  }else{
    return connectionInstance = await getProduction();
  }
};

async function getProduction() {
  try {
    const server = new Server(config.db.host, config.db.port, { auto_reconnect: true });
    var db = new Db(config.db.name, server);
    return await db.open();
  }catch(err) {
    logger.log('error', 'production database error', error);
    throw err;
  } 
}
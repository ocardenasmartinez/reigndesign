const moment = require('moment');
const algoliaHelper = require('../helpers/algolia');
const dateFormat = 'DD/MM/YYYY HH:mm:ss';
const logger = require('winston');

var execute = async () => {
  logger.log('info', 'executing algolia job', moment().format(dateFormat).toString());
  await algoliaHelper();
}

exports.execute = execute;

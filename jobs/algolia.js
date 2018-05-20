const moment = require('moment');
const algoliaHelper = require('../helpers/algolia');
const dateFormat = 'DD/MM/YYYY HH:mm:ss';

var execute = () => {
  console.log("executing algolia job", moment().format(dateFormat).toString());
  algoliaHelper.populate();
}

exports.execute = execute;

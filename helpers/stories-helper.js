const storiesClient = require('../middlewares/stories-client');
const _ = require('lodash');
const moment = require('moment');

var remove = id => {
  return new Promise((resolve, reject) => {
    const created_at_i = Number(id);
    const filter = {
      	created_at_i: created_at_i
    	};
    	const data = {
      	delete: true,
      	created_at_i: created_at_i
    };
    storiesClient.update(filter, data).then(response => {
      console.log("update story success", response.result);
    }, err => {
      console.log("update story error", err);
    });
  });
}

var getAll = () => {
  return new Promise((resolve, reject) => {
    storiesClient.getAll({delete: false}).then(stories => {
      const storiesSorted = _.sortBy(stories, x => {
        return x.created_at_i;
      });
      const storiesOut = [];
      storiesSorted.reverse().forEach(el => {
        storiesOut.push({
          story_title: (el.story_title != null ? el.story_title : el.title),
          story_url: el.story_url,
          created_at: setCreatedAt(el.created_at),
          created_at_i: el.created_at_i,
          story_id: el.story_id,
          author: el.author
        });
      });
      resolve(storiesOut);
    }, err => {
      console.log("err", err);
      reject(err);
    });
  });
}

function setCreatedAt(data) {
  const format = 'MM/DD/YYYY'
  const dateIn = moment(data).format(format).toString();
  const today = moment().format(format).toString();
  const yesterday = moment(data).subtract(0, 'days').format(format).toString();
  var dateOut
  if(today == dateIn) {
    dateOut = moment.utc(data).format("HH:mm");
  }else if(yesterday == dateIn) {
    dateOut = "yesterday";
  } else {
    dateOut = moment.utc(data).format('MMM. D');
  }
  return dateOut;
}

exports.getAll = getAll;
exports.remove = remove;
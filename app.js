var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var path = require('path');
var schedule = require('node-schedule');
var Algolia = require('./jobs/algolia');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.listen(3001, () => {
  console.log('listening on 3001');
});
app.use(require('./routes'));

var j = schedule.scheduleJob('1 * * * * *', function() {
  var algolia = new Algolia();
  algolia.executeJob();
});

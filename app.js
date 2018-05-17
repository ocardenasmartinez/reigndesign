const express = require('express');
const bodyParser= require('body-parser');
const multer  = require('multer');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/hackersnews', (err, database) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
    app.set('db', database);
  }
  app.listen(3001, () => {
    console.log('listening on 3001');
  });
});

app.use(require('./routes'));

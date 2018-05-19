const dbConnection = require('./database/connection.js');

var getByFilter = (filter) => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        collection.find(filter).toArray((err, results) => {
          if(err) {
              console.log("err", err);
              reject(err);
          }
          resolve(results);
        });
      });
    });
  });
};

var save = data  => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        console.log("new story: ", JSON.stringify(data, 1, 1));
        collection.save(data, (err, results) => {
          if(err) {
              console.log("err", err);
              reject(err);
          }
          resolve(results);
        });
      });
    });
  });
}

var update = (filter, data) => {
  return new Promise((resolve, reject) => {
    dbConnection(databaseConnection => {
      databaseConnection.collection('stories', (error, collection) => {
        collection.update(filter, data, (err, results) => {
          if(err) {
              console.log("err", err);
              reject(err);
          }
          resolve(results);
        });
      });
    });
  });
}

exports.getByFilter = getByFilter;
exports.save = save;
exports.update = update;

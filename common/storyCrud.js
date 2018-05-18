var dbConnection = require('./connection.js');

class StoryCrud {
  get() {
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
          collection.find().toArray((error, results) => {
            if(error) reject(error);
            resolve(results);
          });
        });
      });
    });
  }

  save(data) {
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
          collection.save(data, (err, results) => {
            if(error) reject(error);
            resolve(results);
          });
        });
      });
    });
  }

}

module.exports = StoryCrud;

var dbConnection = require('./connection.js');

class StoryCrud {

  get() {
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
          collection.find().toArray((err, results) => {
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

  save(data) {
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
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

  delete(id) {

  }

}

module.exports = StoryCrud;

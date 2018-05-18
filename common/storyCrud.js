var dbConnection = require('./connection.js');

class StoryCrud {

  getAll() {
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
          collection.find({delete: false}).toArray((err, results) => {
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
    //const documentId = new mongo.ObjectID(id);
    return new Promise((resolve, reject) => {
      dbConnection(databaseConnection => {
        databaseConnection.collection('stories', (error, collection) => {
          collection.remove({_id: documentId}, (err, results) => {
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

  update(filter, data) {
    //const documentId = new mongo.ObjectID(id);
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

}

module.exports = StoryCrud;

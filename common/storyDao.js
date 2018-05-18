var mongoDbConnection = require('./connection.js');

class StoryDao {
  async get() {
    mongoDbConnection((databaseConnection) => {
      databaseConnection.collection('stories', (error, collection) => {
        collection.find().toArray((error, results) => {
          console.log("results");
          return results;
        });
      });
    });
  }
  save(data) {
    mongoDbConnection((databaseConnection) => {
      databaseConnection.collection('stories', (error, collection) => {
        collection.save(data, (err, results) => {
          return results;
        });
      });
    });
  }
}

module.exports = StoryDao;

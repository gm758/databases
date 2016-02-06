var db = require('../db');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};


module.exports = {
  messages: {
    get: function (response) {
      db.dbConnection.connect();
      db.query('SELECT content FROM messages', [], function(err, results) {
        response.writeHead(200, headers);
        response.end(JSON.stringify(results));
      });
      db.dbConnection.end();
    }, // a function which produces all the messages
    post: function (request) {
      var data = '';
      request.on('data', function(chunk) {
        data += chunk;
      }).on('end', function() {
        db.dbConnection.connect();
        console.log(data);
        db.dbConnection.query('INSERT INTO messages () VALUES (' + ')', [], function(err, results) {
          if (err) {
            throw err;
          } else {
            console.log('Successfully posted data to database');
          }
        });    
        db.dbConnection.end();
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (response) {
      //TODO: refactor to DRY relative to above get request
      db.dbConnection.connect();
      db.query('SELECT name FROM users', [], function(err, results) {
        response.writeHead(200, headers);
        response.end(JSON.stringify(results));
      })
    },
    post: function (request) {
      var data = '';
      request.on('data', function(chunk) {
        data += chunk;
      }).on('end', function() {
        db.dbConnection.connect();
        console.log(data);
        db.dbConnection.query('INSERT INTO users () VALUES (' + ')', [], function(err, results) {
          if (err) {
            throw err;
          } else {
            console.log('Successfully posted user to database');
          }
        });    
        db.dbConnection.end();
      });
    }
  }
};


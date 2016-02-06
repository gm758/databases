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
      var queryString = 'SELECT m.id AS objectId, username, content AS text, roomname FROM ' +
                  'users as u INNER JOIN messages as m ON (u.id=m.user_id) ' +
                  'INNER JOIN rooms as r ON (r.id=m.room_id)';

      db.dbConnection.query(queryString, [], function(err, results) {
        console.log(results);
        response.writeHead(200, headers);
        response.end(JSON.stringify({results: results}));
      });
    }, // a function which produces all the messages
    post: function (request) {
      //TODO: fix callback hell
      var data = request.body;
      debugger;
      db.dbConnection.query('INSERT IGNORE INTO users (username) VALUES (?)', [data.username], function(err, results) {
        if (err) {
          throw err;
        } else {
          db.dbConnection.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', [data.roomname], function(err, results) {
            if (err) {
              throw err;
            } else {
              var userIdQueryString = 'SELECT * FROM users WHERE username=?';
              db.dbConnection.query(userIdQueryString, [data.username], function(err, results) {
                if (err) {
                  throw err;
                } else {
                  var userId = results[0].id;
                  var roomIdQueryString = 'SELECT * FROM rooms WHERE roomname=?';
                  db.dbConnection.query(roomIdQueryString, [data.roomname], function(err, results) {
                    var roomId = results[0].id;
                    var messageQueryString = 'INSERT INTO messages (content, userId, roomId) VALUES (?,?,?)';
                    db.dbConnection.query(messageQueryString, [data.text, userId, roomId], function(err, results) {
                      if (err) {
                        console.log('an error occured');
                        throw err;
                      } else {
                        console.log('sql insertion successfuly');
                      }
                    });
                  });
                }
              });
            }
          });
        }
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
      });
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


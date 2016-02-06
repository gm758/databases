/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var config = require('../serverConfig.js');

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: config.MYSQL_PASSWORD,
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages';
    dbConnection.query('truncate ' + tablename, done);

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    console.log('start posting');
    request({ method: 'POST',
              uri: 'http://127.0.0.1:3000/classes/users',
              json: { username: 'Valjean' }
    }, function () {
      console.log('begin second post');
      // Post a message to the node chat server:
      request({ method: 'POST',
              uri: 'http://127.0.0.1:3000/classes/messages',
              json: {
                username: 'Valjean',
                text: 'In mercy\'s name, three days is all I need.',
                roomname: 'Hello'
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];
        console.log('begin select query');
        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          expect(results[0].content).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    var insertUsers = "INSERT IGNORE INTO users (username) VALUES ('testuser'); ";
    var insertRooms = "INSERT IGNORE INTO rooms (roomname) VALUES ('main'); ";
    var roomIdQuery = "SELECT * FROM rooms WHERE roomname='main'";
    var userIdQuery = "SELECT * FROM users WHERE username='testuser'";

    var queryString = "INSERT INTO messages SET ?";
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query(insertUsers, function(err) {
      if (err) { throw err; }
      dbConnection.query(insertRooms, function(err) {
        if (err) { throw err; }        
        dbConnection.query(roomIdQuery, function(err, response) {
          var roomId = response[0].id;
          dbConnection.query(userIdQuery, function(err, response) {
            var userId = response[0].id;
            var queryArgs = {content: 'Men like you can never change!', 'user_id': userId, 'room_id': roomId};
            dbConnection.query(queryString, queryArgs, function(err) {
              if (err) { throw err; }

              // Now query the Node chat server and see if it returns
              // the message we just inserted:
              request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
                var messageLog = JSON.parse(body).results;
                expect(messageLog[0].text).to.equal('Men like you can never change!');
                expect(messageLog[0].roomname).to.equal('main');
                done();
              });
            });           
          });
        });
      });
    });
  });
});

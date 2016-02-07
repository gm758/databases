var models = require('../models');
var orm = require('../db/index.js');
var headers = require('../models/index.js');

module.exports = {
  messages: {
    get: function (req, res) {
      orm.Message.findAll({include: [orm.User, orm.Room]})
                .then(function(results) {
                  var data = results.map(function(entry) {
                    return {
                      objectId: entry.get('id'),
                      text: entry.get('content'),
                      username: entry.User.get('username'),
                      roomname: entry.Room.get('roomname'),
                    };
                  });
                  res.writeHead(200, headers);
                  console.log(JSON.stringify(data));
                  res.end(JSON.stringify({results: data}));
                });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      orm.User.findOrCreate({ where: {username: req.body.username}})
        .then(function(result) {
          var UserId = result.Id;
          orm.Room.findOrCreate({where: {roomname: req.body.roomname}})
            .then(function(result) {
              var RoomId = result.id;
              var params = {
                content: req.body.text,
                UserId: UserId,
                RoomId: RoomId,
              };
              orm.Message.create(params).then(function(result) {
                res.sendStatusCode(201);
              });
            });
        });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('get users');
      models.users.get(res);
    },
    post: function (req, res) {
      console.log('post users');
      models.users.post(req, function() {
        res.end();
      });
    }
  }
};


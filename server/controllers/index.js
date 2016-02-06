var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('get messages');
      models.messages.get(res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('post messages');
      models.messages.post(req, function() {
        res.end();
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


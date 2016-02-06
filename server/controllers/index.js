var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(response);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(request);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(response);
    },
    post: function (req, res) {
      models.users.post(request);
    }
  }
};


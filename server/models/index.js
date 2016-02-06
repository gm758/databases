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
    get: function (response, data, statusCode) {
      statusCode = statusCode || 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data));
    }, // a function which produces all the messages
    post: function () {
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};


var mysql = require('mysql');
var config = require('../config.js');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: config.MYSQL_PASSWORD,
  database: 'chat'
});
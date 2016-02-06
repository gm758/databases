var mysql = require('mysql');
var config = require('../serverConfig.js');
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', config.MYSQL_PASSWORD, {
  dialect: 'mysql'
});
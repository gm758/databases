var config = require('./serverConfig.js');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', config.MYSQL_PASSWORD);
var User = sequelize.define('user', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: Sequelize.STRING, unique: true}
});

var Room = sequelize.define('room', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  roomname: {type: Sequelize.STRING, unique: true}
});

var Message = sequelize.define('message', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  content: Sequelize.STRING,
  user_id: {
    type: Sequelize.INTEGER,
    referenecs: {
      model: User,
      key: 'id'
    }
  },
  room_id: {
    type: Sequelize.INTEGER,
    referenecs: {
      model: Room,
      key: 'id'
    }
  }
});

User.sync({force: true}).then(function() {
  console.log('test');

  User.create({username: 'Chatterbox'});
}).then(function() {
  Room.sync({force: true}).then(function() {
    Room.create({roomname: 'lobby'});
  }).then(function(){
    Message.sync({force: true}).then(function() {
      Message.create({content: 'Welcome!', user_id: 1, room_id: 1});
    });
  });
});




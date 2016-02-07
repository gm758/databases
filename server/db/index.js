var config = require('../serverConfig.js');

var Sequelize = require('sequelize');
sequelize = new Sequelize('chat', 'root', config.MYSQL_PASSWORD);

User = sequelize.define('User', {
  username: Sequelize.STRING, 
});

Room = sequelize.define('Room', {
  roomname: Sequelize.STRING,
});

Message = sequelize.define('Message', {
  content: Sequelize.STRING,
});

User.hasMany(Message);
Message.belongsTo(User);

Room.hasMany(Message);
Message.belongsTo(Room);

User.sync({force: true}).then(function() {
  User.create({username: 'Chatterbox'});
}).then(function() {
  Room.sync({force: true}).then(function() {
    Room.create({roomname: 'lobby'});
  }).then(function(){
    Message.sync({force: true}).then(function() {
      Message.create({content: 'Welcome!', 'RoomId': 1, 'UserId': 1}).then(function() {
        Message.findAll({include: [User]}).then(function(result){
          console.log('successfully created welcome message');
        });
      });
    });
  });
});


exports.User = User;
exports.Room = Room;
exports.Message = Message;



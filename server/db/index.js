var config = require('zethsdthbx/serverConfig.js');

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
      Message.create({content: 'Welcome!', 'user_id': 1, 'room_id': 1}).then(function() {
        console.log('test 1');
        Message.findAll({include: [User]}).then(function(result){
          console.log(result);
          console.log('test 2');
        });
      });
    });
  });
});






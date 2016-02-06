var config = require('./serverConfig.js');

var Sequelize = require('sequelize');
exports.sequelize = new Sequelize('chat', 'root', config.MYSQL_PASSWORD);

exports.User = exports.sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING, 
    unique: true, 
    get: function() {
      var id = this.getDataValue('id');
      return this.getDataValue('username') + '(' + id + ')';
    }
  }
});

exports.Room = exports.sequelize.define('room', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  roomname: {type: Sequelize.STRING, unique: true}
});

exports.Message = exports.sequelize.define('message', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  content: Sequelize.STRING,
  // 'user_id': {
  //   type: Sequelize.INTEGER,
  //   referenecs: {
  //     model: exports.User,
  //     key: 'id'
  //   }
  // },
  // 'room_id': {
  //   type: Sequelize.INTEGER,
  //   referenecs: {
  //     model: exports.Room,
  //     key: 'id'
  //   }
  // }
});

exports.Message.belongsTo(exports.User);
exports.User.hasMany(exports.Message);
exports.Message.belongsTo(exports.Room);
exports.Room.hasMany(exports.Message);

exports.User.sync({force: true}).then(function() {
  exports.User.create({username: 'Chatterbox'});
}).then(function() {
  exports.Room.sync({force: true}).then(function() {
    exports.Room.create({roomname: 'lobby'});
  }).then(function(){
    exports.Message.sync({force: true}).then(function() {
      exports.Message.create({content: 'Welcome!', 'user_id': 1, 'room_id': 1}).then(function() {
        console.log('test 1');
        exports.Message.findAll({include: [exports.User]}).then(function(result){
          console.log(result);
          console.log('test 2');
        });
      });
    });
  });
});






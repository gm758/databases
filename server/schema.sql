CREATE DATABASE IF NOT EXISTS chat;

USE chat;


CREATE TABLE users (
  id INT AUTO_INCREMENT,
  username TEXT,
  PRIMARY KEY (id),
  UNIQUE(username)
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT,
  roomname TEXT,
  PRIMARY KEY (id),
  UNIQUE(roomname)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT,
  content TEXT,
  user_id INT,
  room_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

/*
populate welcome message
*/
INSERT INTO users (username) VALUES ('chatbot');
INSERT INTO rooms (roomname) VALUES ('lobby');
INSERT INTO messages (content, user_id, room_id) 
  VALUES ('Welcome!',
          (SELECT id FROM users WHERE username='chatbot'),
          (SELECT id FROM rooms WHERE roomname='lobby')
        );

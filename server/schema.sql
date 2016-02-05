CREATE DATABASE IF NOT EXISTS chat;

USE chat;


CREATE TABLE users (
  id INT,
  name TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INT,
  name TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id INT,
  content TEXT,
  user_id INT,
  room_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */






/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


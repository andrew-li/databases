CREATE DATABASE chat;

USE chat;


CREATE TABLE users (
  /* Describe your table here.*/
  createdAt DATETIME,
  userId int(10) NOT NULL auto_increment,
  randomAttribute VARCHAR(25),
  updatedAt DATETIME,
  username VARCHAR(25) UNIQUE,
  PRIMARY KEY (userId)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  createdAt DATETIME,
  objectId int(10) NOT NULL auto_increment,
  roomname VARCHAR(25),
  text VARCHAR(100),
  updatedAt DATETIME,
  userId int(10),
  FOREIGN KEY (userId) REFERENCES users(userId),
  PRIMARY KEY (objectId)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


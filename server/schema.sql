CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  createdAt DATETIME,
  objectId VARCHAR(10),
  roomname VARCHAR(25),
  text VARCHAR(100),
  updatedAt DATETIME,
  username VARCHAR(25),

  PRIMARY KEY (objectId)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


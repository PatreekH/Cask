-- This will be used to set up out data base for user data
-- you can use it in your mySQL workbench for your local DB for the login to work properly

CREATE DATABASE caskDB;

USE caskDB;

CREATE TABLE cask-users (

userID INTEGER(100) AUTO_INCREMENT NOT NULL,
userName VARCHAR(100) NOT NULL,
userEmail VARCHAR(100) NOT NULL,
userSecret VARCHAR(24) NOT NULL,
favBeer VARCHAR(40) NOT NULL, 
city VARCHAR(40) NOT NULL,
favBar VARCHAR(40) NOT NULL,
PRIMARY KEY(userID)

);

INSERT INTO cask-users (userName, userEmail, userSecret, favBeer, city, favBar)
VALUES (), (), (), ();
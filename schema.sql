-- This will be used to set up out data base for user data
-- you can use it in your mySQL workbench for your local DB for the login to work properly

CREATE DATABASE caskDB;

USE caskDB;

CREATE TABLE caskUsers (

userID INTEGER(100) AUTO_INCREMENT NOT NULL,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
userName VARCHAR(30) NOT NULL,
userEmail VARCHAR(30) NOT NULL,
userSecret VARCHAR(24) NOT NULL,
favBeer VARCHAR(40) NOT NULL, 
city VARCHAR(40) NOT NULL,
favBar VARCHAR(40) NOT NULL,
selectedBeer VARCHAR(40),
selectedBeerUrl VARCHAR(100),
PRIMARY KEY(userID)

);

INSERT INTO caskUsers (firstName, lastName, userName, userEmail, userSecret, favBeer, city, favBar)
VALUES ("John", "Tracy", "jtracy728", "johnmtracy133@gmail.com", "motocross", "Busch", "Orlando", "BackBooth" );
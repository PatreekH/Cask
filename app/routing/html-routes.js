var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({

  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.argv[2],
  database: 'caskDB'

});

module.exports = function(app){

	// Constructor for user's data
	function UserInfo(firstName, lastName, city, favBar, favBeer, email, userName) {
			
			this.firstName = firstName,
			this.lastName = lastName,
			this.city = city,
			this.favBar = favBeer,
			this.favBeer = favBeer,
			this.email = email,
			this.userName = userName

	};
	var userData;

		// Authentication and Authorization Middleware
	var auth = function(req, res, next) {
		console.log('=============');
		console.log(req.url);
		console.log(req.session);
	  // verifing that the session properties are valid
	  if (req.session && req.session.isAuth == true){
	  // if true the next parameter is invoked and procedes to line 79
	    return next();
		}
	  else {
	    // send a response to client informing them
	    // that they are unauthorized to recive the page they are 
	    // requesting without proper credentials
	    return res.sendStatus(401);
		}
	};

	app.post('/loginInfo', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;
	var userQuery = 'SELECT firstName, userEmail, favBeer, favBar, city FROM caskUsers WHERE userName = ? AND userSecret = ?';
	//req.session.isAuth = true;
	connection.query(userQuery,[userName, password], function(err, data){
		if(err) {
			res.json('invalid');
			return;
		}
		else if(data[0]){

				req.session.isAuth = true;
				console.log(req.session);
				
				var	city = data[0].city;
				var	favBar = data[0].favBar;
				var	favBeer = data[0].favBeer;
				var	firstName = data[0].firstName;
				var	lastName = data[0].lastName;
				var	userEmail = data[0].userEmail;
				var	userName = data[0].userName;

				userData = new UserInfo(firstName, lastName, city, favBar, favBeer, userEmail, userName);
				
				res.send("success");
			}
		else {
				res.json('invalid');
		}
			
		});
	
	});

	app.post('/signup', function(req, res){

		var userName = req.body.userName;
		var first = req.body.firstName;
		var last = req.body.lastName;
		var pass = req.body.password;
		var email = req.body.email;
		var favBeer = req.body.favBeer;
		var favBar = req.body.favBar;
		var city = req.body.city;



		var firstNewUser = 'INSERT INTO caskUsers (firstName, lastName, userName, userEmail, userSecret, favBeer, city, favBar)';
		var secontdNewUser = 'VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

		connection.query(firstNewUser + secontdNewUser, [first, last, userName, email, pass, favBeer, city, favBar], function(err){
			if(!err){
				res.json('success');
			}
		});
	});

	app.post('/userauth', function(req, res){

		if(req.session.isAuth == true){
			res.json({
				success: 'success',
				name: userData.firstName
			});
		}
		else if(!req.session.isAuth){
			res.json('invalid');
		}
	});

	app.get('/logout', function(req, res){
		req.session.destroy();
	});

	app.get('/home', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/html/index.html'));
	});

	app.use(function(req, res){
			res.sendFile(path.join(__dirname + '/../public/html/landing.html'));
	});


}
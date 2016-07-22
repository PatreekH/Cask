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

	var exphbs = require('express-handlebars');
	app.engine('handlebars', exphbs({defaultLayout: 'main'}));
	app.set('view engine', 'handlebars');

	// Constructor for user's data
	function UserInfo(firstName, lastName, city, favBar, favBeer, email, userName, surveyBeer, beerPic) {
			
			this.firstName = firstName,
			this.lastName = lastName,
			this.city = city,
			this.favBar = favBar,
			this.favBeer = favBeer,
			this.email = email,
			this.userName = userName,
			this.surveyBeer = surveyBeer,
			this.beerPic = beerPic

	};
	var userData;

	app.post('/loginInfo', function(req, res){
	var userName = req.body.userName;
	var password = req.body.password;
	var userQuery = 'SELECT firstName, lastName, userEmail, favBeer, favBar, city, userName, selectedBeer, selectedBeerUrl FROM caskUsers WHERE userName = ? AND userSecret = ?';
	//req.session.isAuth = true;
	connection.query(userQuery,[userName, password], function(err, data){
		if(err) {
			res.json('invalid');
			return;
		}
		else if(data[0]){

				req.session.userName = data[0].userName;
				req.session.isAuth = true;
				console.log(req.session);
				
				var	city = data[0].city;
				var	favBar = data[0].favBar;
				var	favBeer = data[0].favBeer;
				var	firstName = data[0].firstName;
				var	lastName = data[0].lastName;
				var	userEmail = data[0].userEmail;
				var	userName = data[0].userName;
				var surveyBeer = data[0].selectedBeer;
				var beerPic = data[0].selectedBeerUrl;

				userData = new UserInfo(firstName, lastName, city, favBar, favBeer, userEmail, userName, surveyBeer, beerPic);
				
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

//	app.post('/forgot', function(req, res){
//		
//		var theQuery = 'SELECT userSecret, userEmail FROM caskUsers WHERE userName = ?';
//		connection.query(theQuery, [req.body.userName], function(err, data){
//			if(err){
//				res.json('invalid');
//				return;
//			}
//			else if(data[0]){
//			
//				res.json({
//					success: 'success',
//					userPass: data[0].userSecret,
//					userEmail: data[0].userEmail
//				});
//			}
//			else{
//				res.json('invalid');
//			}
//		});
//
//	});

	app.post('/surveydata', function(req, res){
		if(req.session.isAuth == true){
			var beerPic = req.body.beerUrl;
			var beerName = req.body.beerName;
			var theQuery = 'UPDATE caskUsers SET selectedBeer = ?, selectedBeerUrl = ? WHERE userName = ?';
			connection.query(theQuery, [beerName, beerPic, req.session.userName]);
			res.json('success');
		}
		else{
			res.json('invalid');
		}
	});


	app.get('/profile', function(req, res){
		console.log('profile request' + userData.surveyBeer + ' ' + userData.beerPic);
		if(userData.surveyBeer == null && userData.beerPic == null) {
			res.render('user-profile', {


				firstName: userData.firstName,
				lastName: userData.lastName,
				userName: userData.userName,
				city: userData.city,
				email: userData.email,
				favBeer: userData.favBeer,
				favBar: userData.favBar

			});
		}
		else if(userData.surveyBeer !== null && userData.beerPic !== null){
			res.render('user-profile', {


				firstName: userData.firstName,
				lastName: userData.lastName,
				userName: userData.userName,
				city: userData.city,
				email: userData.email,
				favBeer: userData.favBeer,
				favBar: userData.favBar,
				selectedBeer: userData.selectedBeer,
				beerPic: userData.beerPic

			});
		}
	});

	app.get('/logout', function(req, res){
		req.session.destroy();
		res.sendFile(path.join(__dirname + '/../public/html/landing.html'));		
	});

	app.get('/home', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/html/index.html'));
	});

	app.use(function(req, res){
			res.sendFile(path.join(__dirname + '/../public/html/landing.html'));
	});


}
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
var app = express();
var PORT = process.env.PORT || 5000; 


var connection = mysql.createConnection({

  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'caskDB'

});

// express session for user authentication
session = require('express-session');
app.use(session({
    secret: 'cask user',
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('app/public'));



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

				userData = {
					city: data[0].city,
					favBar: data[0].favBar,
					favBeer: data[0].favBeer,
					firstName: data[0].firstName,
					userEmail: data[0].userEmail
				}


				res.send("success");
			}
			
		else {
			res.json('invalid');
		}
			
	});
	
});

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/app/public/html/landing.html'));
});

app.get('/home', auth, function(req, res){
	res.sendFile(path.join(__dirname + '/app/public/html/index.html'));
});




//require('./app/routing/api-routes.js')(app); 
//require('./app/routing/html-routes.js')(app);

app.listen(PORT, function() {
	console.log('App listening on PORT: ' + PORT);
});
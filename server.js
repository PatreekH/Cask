var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 5000; 


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

require('./app/routing/api-routes.js')(app); 
require('./app/routing/html-routes.js')(app);

app.listen(PORT, function() {
	console.log('App listening on PORT: ' + PORT);

});
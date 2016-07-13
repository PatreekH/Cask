var beerData = require('../data/data.js');
var path = require('path');
var geocoder = require('geocoder');
var request = require('request');
var url = "http://api.brewerydb.com/v2/?beer/oeGSxs?key=ab12f84ebc125fbbfd15ff211dd304e6";


module.exports = function(app){

	app.get('/api/data', function(req, res){
		res.json(beerData)
	});

	app.post('/api/data', function(req, res){

		var userData = req.body;

		console.log(req.body);

		beerData.push(userData);

		console.log(beerData);


	})


}
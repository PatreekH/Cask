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
		var userLocation = userData.city;

		//Geocodes user input (to long/lat)
		geocoder.geocode(userLocation, function ( err, data ) {
			var locationGeometry = data.results[0].geometry.location;
			var lat = locationGeometry.lat;
			var long = locationGeometry.lng;
			findBreweries(lat, long)

		});

		//Takes geocoded location to use in BreweryDB API search for nearby breweries.  Searches in 35 mile radius.
		function findBreweries(lat, long) {

			//Building URL for BreweryDB API.
			var url = "https://api.brewerydb.com/v2/search/geo/point?";
			var key = "&key=ab12f84ebc125fbbfd15ff211dd304e6&format=json"
			url += "lat=" + lat;
			url += "&lng=" + long;
			url += "&radius=35";
			url += key;


			request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
				  	var breweryData = JSON.parse(body)
				  	var numOfResults = breweryData.totalResults;

				  	//Dynamically creating brewery objects containing only select information from breweries, in hopes to reduce payload of our API page.
				  	for (var i = 0; i < numOfResults; i++) {
				  		var selectedBreweryData = {
				  			breweryName: breweryData.data[i].brewery.name,
				  			latitude: breweryData.data[i].latitude,
				  			longitude: breweryData.data[i].longitude,
				  			description: breweryData.data[i].brewery.description,
				  			typeOfBrewery: breweryData.data[i].locationTypeDisplay

				  		}
				  		//Pushing above object to our API for use on front-end.
				  		beerData.push(selectedBreweryData)
				  	}
				}
			})
		}
	})
}
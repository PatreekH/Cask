var beerData = require('../data/data.js');
var surveyData = require('../data/survey-data.js')
var path = require('path');
var geocoder = require('geocoder');
var request = require('request');
var url = "http://api.brewerydb.com/v2/?beer/oeGSxs?key=ab12f84ebc125fbbfd15ff211dd304e6";


module.exports = function(app){




	//Brewery search logic for google maps API
	var frontEndData = []

	app.get('/api/data', function(req, res){
		res.json(frontEndData);
	});


	app.post('/api/data', function(req, res){

		var userData = req.body;
		var userLocation = userData.city;

		//Geocodes user input (to long/lat)
		geocoder.geocode(userLocation, function ( err, data ) {
			var locationGeometry = data.results[0].geometry.location;
			var lat = locationGeometry.lat;
			var long = locationGeometry.lng;
			var initialMapsCenter = {
				latitude: lat,
				longitude: long
			}
			frontEndData.push(initialMapsCenter)
			findBreweries(lat, long)

		});

		//Takes geocoded location to use in BreweryDB API search for nearby breweries.  Searches in 35 mile radius.
		function findBreweries(lat, long) {

			//Building URL for BreweryDB API.
			var url = "https://api.brewerydb.com/v2/search/geo/point?";
			var key = "&key=ab12f84ebc125fbbfd15ff211dd304e6&format=json"
			url += "lat=" + lat;
			url += "&lng=" + long;
			url += "&radius=25";
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
				  		frontEndData.push(selectedBreweryData);
				  	}
				  	res.json(frontEndData);
				}
			})
		}
	})


	//Survey result logic
	var surveyArray = []

	app.get('/api/survey', function(req, res){
		res.json(surveyArray);
	});

	app.post('/api/survey', function(req, res){

	//Declaring variables for post data
	var surveyData = req.body;
	var result = surveyData.result;
	//Turning result array of strings into array of numbers
	var userResult = result.map(Number);
	//Variables used to generate request URL to match user with beer

	//color / brightness
	var srm = "?srmId="
		//alcohol content/strength
	var abv = "&abv="
	//biterness
	var ibu = "&ibu="
	//organic
	var organic;



	//Verbage for dynamically created string if user palette survey returns no results
	var srmWords;
	var abvWords;
	var ibuWords;
	var organicWords;

	//Sorry, we could not find any results for a **color** beer that is **low/medium/high** in alcohol content and also "low/medium/high"
	//in hops content.  Here are some other beers for you we think you might like.  They are ***organic***;

	//switch statement for SRM. Since we cannot search for SRM by range, I randomly generate a number in the range of 10 for each input.
	//case: 3 is null because the user is indifferent about their SRM.
	switch(userResult[0]) {
		case 1:
			srm += Math.floor(Math.random()*(10-1+1)+1);
			srmWords = "light";
			break;
		case 2: 
			srm += Math.floor(Math.random()*(20-11+1)+11);
			srmWords = "amber-colored";
			break;
		case 3:
			srm;
			break;
		case 4:
			srm += Math.floor(Math.random()*(30-21+1)+21);
			srmWords = "amber-colored";
			break;
		case 5:
			srm += Math.floor(Math.random()*(40-31+1)+31);
			srmWords = "dark";
			break;
	}

	//switch statement for ABV
	switch(userResult[1]) {
		case 1:
			abv += "+10";
			abvWords = "extremely high";
			break;
		case 2:
			abv += "6,9";
			abvWords = "high";
			break;
		case 3:
			abv;
			break;
		case 4:
			abv += "3,5";
			abvWords = "medium";
			break;
		case 5:
			abv += "-3";
			abvWords = "low";
			break;
	}

	//Switch statement for IBU

	switch(userResult[2]) {
		case 1:
			ibu += "+70";
			ibuWords = "extremely high";
			break;
		case 2:
			ibu += "50,70";
			ibuWords = "high";
			break;
		case 3:
			ibu;
			break;
		case 4:
			ibu += "30,50";
			ibuWords = "medium";
			break;
		case 5:
			ibu += "-30";
			ibuWords = "low";
			break;
	}


	//Switch statement for organic

	switch(userResult[3]) {
		case 1:
			organic = "Y";
			organicWords = "organic, you whole-foods loving hippie!";
			break;
		case 2:
			organic = "Y";
			organicWords = "organic, you whole-foods loving hippie!";
			break;
		case 4:
			organic = "N";
			organicWords = "non-organic";
			break;
		case 5:
			organic = "N";
			organicWords = "non-organic";
			break;
	}

	//Function to match user with beer based upon URL that is generated
	function matchBeer() {
		var key = "&key=ab12f84ebc125fbbfd15ff211dd304e6&format=json";
		var url = "https://api.brewerydb.com/v2/beer/random";
		url += srm;
		url += ibu;
		url += abv;
		url += key;
		console.log(url);

		var url2 = "https://api.brewerydb.com/v2/beer/random/?ibu=10,11&abv=+10&key=ab12f84ebc125fbbfd15ff211dd304e6&format=json"
		request(url, function (error, response, body) {
				if (!error) {
				  	var matchedBeer = JSON.parse(body)
				  	console.log(matchedBeer);

				  	surveyArray.push(matchedBeer.data);

				  	res.json(surveyArray);
				}
			})


	};
	matchBeer();

	})
}
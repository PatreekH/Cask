$(".main").onepage_scroll();

var marker;

var markers = [];
var markerContent = [];

var numOfBreweries = 0;


//When a user enters a location and clicks "submit", do the following:
$("#submitLocation").on('click', function(){

	//grabbing the location the user enters
	var userLocation = $("#user_location").val();

	//Putting location in an object to access in back-end via API
	userData = {
		city: userLocation
	}
	var currentUrl = window.location.origin;

	var breweryData;

	//Posting user location input to backend to populate API with nearby breweries.
	$.post("/api/data", userData, function(data) {
		breweryData = data;
		console.log(breweryData);
		lat = breweryData[0].latitude;
		long = breweryData[0].longitude;
		zoom = 9;
		numOfBreweries = breweryData.length - 1;

		//Setting markers
		for (var i = 1; i < breweryData.length; i++) {
			var markerLat = breweryData[i].latitude;
			var markerLong = breweryData[i].longitude;
			var nameOfBrewery = breweryData[i].breweryName;
			var typeOfBrewery = breweryData[i].typeOfBrewery;
			var breweryDescription = breweryData[i].description;
			var infoContent = 
								['<div class="info_content">' + 
								'<h2>' + nameOfBrewery + '</h2>' +
								'<h3>' + typeOfBrewery + '</h3>' +
								'<p>' + breweryDescription + '</p></div>'];

			var newMarker = [nameOfBrewery, markerLat, markerLong];
			markers.push(newMarker);
			markerContent.push(infoContent);
		}
		initMap();
	})

    


	//Because refreshes make me sad.
	return false;

});



//Google maps API info.

var lat = 40.9097802;
var long = -100.1617613;
var zoom = 4;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lat, lng: long},
        scrollwheel: false,
        zoom: zoom
    });

    var infoWindow = new google.maps.InfoWindow(), marker, i;

    for (var i = 0; i < numOfBreweries; i++) {
    	var position = new google.maps.LatLng(markers[i][1], markers[i][2]);

	    marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(markerContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
    }
}

// Survey JS

$('#takeSurvey').mouseover(function() {
	$('#takeSurvey').css("color", "white");
});

$('#takeSurvey').mouseout(function() {
	$('#takeSurvey').css("color", "black");
});

$(document).ready(function(){

	var qCount = 0;

	$('.nextQ').click(function() {
		nextQ();
		qCount += 1;
	});

	$('.nextQ').mouseover(function() {
		$('.nextQtext').animate({right: 70 + "%"}, 500);
	});

	$('.nextQ').mouseout(function() {
		$('.nextQtext').animate({right: -200 + "%"}, 500);
	});

	$('.lastQ').mouseover(function() {
		$('.lastQtext').animate({right: 70 + "%"}, 500);
	});

	$('.lastQ').mouseout(function() {
		$('.lastQtext').animate({right: -190 + "%"}, 500);
	});

	$('.firstQ').mouseover(function() {
		$('.firstQtext').animate({left: 70 + "%"}, 500);
	});

	$('.firstQ').mouseout(function() {
		$('.firstQtext').animate({left: -170 + "%"}, 500);
	});

	$('.backQ').mouseover(function() {
		$('.backQtext').animate({left: 70 + "%"}, 500);
	});

	$('.backQ').mouseout(function() {
		$('.backQtext').animate({left: -180 + "%"}, 500);
	});

	function nextQ(){ 
		$('.nextQtext').animate({right: -60 + "%"}, 500);
		for (i = 1; i <= 4; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert - 100;
			$("#box" + i).animate({left: newPos + "%"}, 1000);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

	$('.backQ').click(function() {
		backQ();
		qCount -= 1;
	});

	function backQ(){ 
		$('.backQtext').animate({left: -50 + "%"}, 500);
		for (i = 1; i <= 4; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert + 100;
			$("#box" + i).animate({left: newPos + "%"}, 1000);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

	$('.firstQ').click(function() {
		firstQ();
	});

	function firstQ(){ 
		for (i = 1; i <= 4; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var currQ = qCount * 100
			var newPos = posConvert + currQ;
			$("#box" + i).animate({left: newPos + "%"}, 1750);
			//console.log("Q" + i + ": " + newPos);
		}
		qCount = 0;
	}

	$('.lastQ').click(function() {
		lastQ();
	});

	function lastQ(){
		var qToFinish = 3 - qCount; 
		for (i = 1; i <= 4; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var currQ = qToFinish * 100
			var newPos = posConvert - currQ;
			$("#box" + i).animate({left: newPos + "%"}, 1750);
			//console.log("Q" + i + ": " + newPos);
		}
		qCount = 3;
	}


});

$('#takeSurvey').click(function() {
    $('#surveyDiv').animate({'marginLeft' : 0 + "%"}, 750);
});

$('#exitSurvey').click(function() {
    $('#surveyDiv').animate({'marginLeft' : 200 + "%"}, 1250);
});

$('#submit').click(function() {
	console.log($(".q1").val() + " " + $(".q2").val() + " " + $(".q3").val() + " " + $(".q4").val())
});


//Getting value of each radio input;
$('#sub1').on('click', function(){
	var selected = $(".question1:checked").val();
	console.log(selected);
	return false;
})

$(document).ready(function(){

	var currentUrl = window.location.origin;

	$.ajax({

		method: 'POST',
		url: currentUrl + '/userauth',
		data: {
			test: 'connect to server',

		},
		success: function(response){
			if(response == 'success'){
				$(".welcomeText").html("User")//<-- pull user name from db and add name
				// add survery link and "Hello, 'user's first name"
				// also add a logout link!!!!!!!
				console.log('logged in!!!!!');

			}
			else{
				$(".welcomeText").html("Visitor!")
				console.log('not logged in...');

			}
		}



	})

});
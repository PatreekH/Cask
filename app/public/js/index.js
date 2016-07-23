$(".main").onepage_scroll();

//Declaring variables for use in populating google maps API logic
var marker;
var markers = [];
var markerContent = [];
var numOfBreweries = 0;
//Google maps API initMap() function
var lat = 40.9097802;
var long = -100.1617613;
var zoom = 4;

//When a user enters a location and clicks "submit", do the following:
$("#submitLocation").on('click', function(){

	//grabbing the location the user enters
	var userLocation = $("#user_location").val();

	//Putting location in an object to access in back-end via API
	userData = {
		city: userLocation
	}

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
								'<h2 class="brewery-name">' + nameOfBrewery + '</h2>' +
								'<h3 class="brewery-type">' + typeOfBrewery + '</h3>' +
								'<p class="brewewry-description">' + breweryDescription + '</p></div>'];

			var newMarker = [nameOfBrewery, markerLat, markerLong];
			markers.push(newMarker);
			markerContent.push(infoContent);
		}
		initMap();
	})

    


	//Because refreshes make me sad.
	return false;

});

//Function that delcares map and populates it with markers (if there are any)
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

// Survey logic

// Flash black/white action for "Click me" button on take survey page
$('#takeSurvey').mouseover(function() {
	$('#takeSurvey').css("color", "white");
});
$('#takeSurvey').mouseout(function() {
	$('#takeSurvey').css("color", "black");
});

// Logic for off page survey div
$(document).ready(function(){

/*window.onload = function(){
	setTimeout(function(){
		$(".indexLogo").fadeIn(1000);
	}, 6750);
};*/




// Current question set to 0
	var qCount = 0;

// All animation functions for survey navigation
	
	// Next Question
	$('.nextQ').mouseover(function() {
		$('.nextQtext').animate({right: 70 + "%"}, 500);
	});
	$('.nextQ').mouseout(function() {
		$('.nextQtext').animate({right: -200 + "%"}, 500);
	});

	// Go to Last Question
	$('.lastQ').mouseover(function() {
		$('.lastQtext').animate({right: 70 + "%"}, 500);
	});
	$('.lastQ').mouseout(function() {
		$('.lastQtext').animate({right: -190 + "%"}, 500);
	});

	// Previous Question
	$('.backQ').mouseover(function() {
		$('.backQtext').animate({left: 70 + "%"}, 500);
	});
	$('.backQ').mouseout(function() {
		$('.backQtext').animate({left: -180 + "%"}, 500);
	});

	// Go to First Question
	$('.firstQ').mouseover(function() {
		$('.firstQtext').animate({left: 70 + "%"}, 500);
	});
	$('.firstQ').mouseout(function() {
		$('.firstQtext').animate({left: -170 + "%"}, 500);
	});

	// Runs nextQ function and adds 1 to qCount on next question click
	$('.nextQ').click(function() {
		nextQ();
		qCount += 1;
	});

	// Moves all question divs 100% to the right, pushing the current div on screen to the left
	function nextQ(){ 
		$('.nextQtext').animate({right: -60 + "%"}, 500);
		for (i = 1; i <= 5; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert - 100;
			$("#box" + i).animate({left: newPos + "%"}, 1000);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

	// Runs backQ function and subtracts 1 from qCount on back question click
	$('.backQ').click(function() {
		backQ();
		qCount -= 1;
	});

	// Moves all question divs 100% to the left, pushing the current div on screen to the right
	function backQ(){ 
		$('.backQtext').animate({left: -50 + "%"}, 500);
		for (i = 1; i <= 5; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert + 100;
			$("#box" + i).animate({left: newPos + "%"}, 1000);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

	// Runs firstQ function on first question click
	$('.firstQ').click(function() {
		firstQ();
	});

	// Moves all question divs 100% to the right as many times as the current qCount, sets qCount to 0 after
	function firstQ(){ 
		for (i = 1; i <= 5; i++){
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

	// Runs firstQ function on last question click
	$('.lastQ').click(function() {
		lastQ();
	});

	// Subtracts current question from total questions to make qToFinish var
	// Moves all question divs 100% to the left as many times as qToFinish total
	// Sets qCount to 3
	function lastQ(){
		var qToFinish = 3 - qCount; 
		for (i = 1; i <= 5; i++){
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

	//On click #submit show results box

	$(".submitbtn").click(function() {
		nextQ();
	});

	$('#takeSurvey').click(function() {
	    $('#surveyDiv').animate({'marginLeft' : 0 + "%"}, 750);
	});

	$('#exitSurvey').click(function() {
		if (confirm("Are you sure you want to exit? Exiting the survey will reset your current answers") == true) {
			$(".question1").prop('checked', false);
			$(".question2").prop('checked', false);
			$(".question3").prop('checked', false);
			$(".question4").prop('checked', false);
			firstQ();
			$('#surveyDiv').animate({'marginLeft' : 200 + "%"}, 1250);
	    } else {
	        console.log("Did not exit");
	    }
	});


});

//Declaring variables for use in survey
var answers = []
//Putting answers into an object to be sent to back-end
var surveyData = {
	result: answers
}

function surveyPost(beerName, beerImage){
	var currentUrl = window.location.origin;
		$.ajax({
			method: 'POST',
			url: currentUrl + '/surveydata',
			data: {
				beerName: beerName,
				beerUrl: beerImage 
			},
			sucess: function(response){
				console.log('response from survery data post: ' + response);
			}
		});
	};

//Getting value of each radio input
$("#submit").on("click", function(){
	var question1 = $(".question1:checked").val();
	var question2 = $(".question2:checked").val();
	var question3 = $(".question3:checked").val();
	var question4 = $(".question4:checked").val();
	answers.push(question1, question2, question3, question4);

	$.post("/api/survey", surveyData, function(data) {


		//Logic for "progress bars" detailing how intense the flavors of the beer are.
		var abvPercentage = parseInt(data[0].abv) * 7.1;
		var ibuPercentage = parseInt(data[0].ibu) * 1.3;
		var srmPercentage = parseInt(data[0].srmId) * 2.5;

		$("#abv").css("width", abvPercentage + "%");
		$("#ibu").css("width", ibuPercentage + "%");
		$("#srm").css("width", srmPercentage + "%");

		//Logic for determining organic or not
		if (data[0].isOrganic == "Y") {
			$("#organic").attr("class", "fa fa-check")
		} else {
			$("#organic").attr("class", "fa fa-times");
		}

		//Logic for determining beer title, sub-title (style), image, and description.
		$("#beer-title").text(data[0].name);
		$("#beer-style").text(data[0].style.name)


		if (data[0].description) {
			$("#beer-description").text(data[0].description)
		} else {
			$("#beer-description").text(data[0].style.description)
		}


		if (data[0].labels) {
			$("#beer-image").attr("src", data[0].labels.medium);
		} else {
			$("#beer-image").attr("src", "../css/images/stein_bkgd.png")
			$("#no-image").text("Sorry! No image of beer found.")
		}



		console.log(data)
		//This is where the error is John
		var beerName = data[0].name;
		if(data[0].labels.medium !== undefined){
			var beerImage = data[0].labels.medium;
		}
		else{
			var beerImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/72928-200.png";
		}

		if(beerName !== null){
			surveyPost(beerName, beerImage);
		}


	})

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
			if(response.success == 'success'){
				$(".welcomeText").html(response.name);
				$("#sign-up-link").remove();
			}
			else{
				$(".welcomeText").html("Visitor!");
				$("#profile-link").remove();
				$("#logout-link").remove();

			}
		}



	})

});
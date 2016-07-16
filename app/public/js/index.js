$(".main").onepage_scroll();


//When a user enters a location and clicks "submit", do the following:
$("#submitLocation").on('click', function(){

	//grabbing the location the user enters
	var userLocation = $("#user_location").val();

	//Putting location in an object to access in back-end via API
	userData = {
		city: userLocation
	}

	//Posting user location input to backend to populate API with nearby breweries.
	$.post("/api/data", userData, function(data) {
		console.log("indexjs data" + data);
	})
    
    $.get("/api/data", userData, function(data) {
		console.log(data);
	})

	//Because I'm not a fan of refreshing pages.
	return false;

});



//Google maps API info.
var laty = 40.9097802;
var long = -100.1617613;
var zoom;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: laty, lng: long},
        scrollwheel: false,
        zoom: 3
    });
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
		$('.nextQtext').animate({right: 45 + "%"}, 500);
	});

	$('.nextQ').mouseout(function() {
		$('.nextQtext').animate({right: -60 + "%"}, 500);
	});

	function nextQ(){ 
		$('.nextQtext').animate({right: -60 + "%"}, 500);
		for (i = 1; i <= 10; i++){
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

	$('.backQ').mouseover(function() {
		$('.backQtext').animate({left: 50 + "%"}, 500);
	});

	$('.backQ').mouseout(function() {
		$('.backQtext').animate({left: -50 + "%"}, 500);
	});

	function backQ(){ 
		$('.backQtext').animate({left: -50 + "%"}, 500);
		for (i = 1; i <= 10; i++){
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
		for (i = 1; i <= 10; i++){
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
		var qToFinish = 9 - qCount; 
		for (i = 1; i <= 10; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var currQ = qToFinish * 100
			var newPos = posConvert - currQ;
			$("#box" + i).animate({left: newPos + "%"}, 1750);
			//console.log("Q" + i + ": " + newPos);
		}
		qCount = 9;
	}


});

$('#takeSurvey').click(function() {
    $('#surveyDiv').animate({'marginLeft' : 0 + "%"}, 750);
});

$('#exitSurvey').click(function() {
    $('#surveyDiv').animate({'marginLeft' : 200 + "%"}, 1250);
});

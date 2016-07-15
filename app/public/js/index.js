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
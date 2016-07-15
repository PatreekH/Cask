$(".main").onepage_scroll();

$("#sub").on('click', function(){

	var userLocation = $("#user_location").val();

	userData = {
		city: userLocation
	}

	//Posting user location input to backend to populate API with nearby breweries.
	$.post("/api/data", userData, function(data) {
		console.log("indexjs data" + data);
	})

/*	populateMap();*/

	return false;

});



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
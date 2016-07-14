

$("#sub").on('click', function(){

var userLocation = "orlando";

userData = {
	city: userLocation
}


$.post("/api/data", userData, function(data) {
	console.log("indexjs data" + data);
})

});

$(".main").onepage_scroll();

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
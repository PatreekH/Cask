

$("#sub").on('click', function(){

var userLocation = "orlando";

userData = {
	city: userLocation
}


$.post("/api/data", userData, function(data) {
	console.log("indexjs data" + data);
})

});
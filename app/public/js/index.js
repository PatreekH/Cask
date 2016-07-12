var userLocation = "orlando";

userData = {
	city: userLocation
}


$.post("/api/data", userData, function(data) {
	console.log("index data" + data);
})


console.log("test");
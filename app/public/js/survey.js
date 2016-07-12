$(document).ready(function(){

	var qCount = 0;

	$('.nextQ').click(function() {
		nextQ();
		qCount += 1;
	});

	function nextQ(){ 
		for (i = 1; i <= 10; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert - 100;
			$("#box" + i).animate({left: newPos + "%"}, 750);
			console.log("Q" + i + ": " + posConvert);
		}
	}

	$('.backQ').click(function() {
		backQ();
		qCount -= 1;
	});

	function backQ(){ 
		for (i = 1; i <= 10; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert + 100;
			$("#box" + i).animate({left: newPos + "%"}, 750);
			console.log("Q" + i + ": " + posConvert);
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
			console.log("Q" + i + ": " + newPos);
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
			console.log("Q" + i + ": " + newPos);
		}
		qCount = 9;
	}


});


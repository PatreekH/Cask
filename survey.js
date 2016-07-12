$(document).ready(function(){

	$('.nextQ').click(function() {
			nextQ();
	});

	function nextQ(){ 
		for (i = 1; i <= 10; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert - 100;
			$("#box" + i).animate({left: newPos + "%"}, 750);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

	$('.backQ').click(function() {
		backQ();
	});

	function backQ(){ 
		for (i = 1; i <= 10; i++){
			var windowSize = $(window).width();
			var pos = $("#box" + i).position();
			var posConvert = (pos.left / windowSize) * 100;
			var newPos = posConvert + 100;
			$("#box" + i).animate({left: newPos + "%"}, 750);
			//console.log("Q" + i + ": " + posConvert);
		}
	}

});


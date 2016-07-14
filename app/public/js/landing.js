

$('#login').on('click', function(){


	
	var user = $('#user-login').val().trim();
	var pass = $('#pass-login').val().trim();

	//console.log(userName + "and" + password);
	// stores current url in currentUrl variabl
	var currentUrl = window.location.origin;


	$.ajax({

		method: 'POST',

		url: currentUrl + '/loginInfo',

		data: {
			userName: user,
			password: pass
		},
		success: function(text){
			if (text == "success"){
				
			}
			else if(text == "invalid"){
				

			}
		}

	});
	$('#pass-login').val('');
	$('#user-login').val('');

});

$('#signUp').on('click', function(){
	$('#signup-modal').modal('toggle');
})
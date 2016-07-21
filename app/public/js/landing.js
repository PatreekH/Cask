

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
		success: function(response){
			if (response == "invalid"){
				$('#error-modal').modal('toggle');
			}
			else if(response == "success"){
				var url = window.location.origin + '/home';
				console.log(response);
				window.location.replace(url);
			}
		}

	});
	$('#pass-login').val('');
	$('#user-login').val('');

});

$('#signUp').on('click', function(){
	$('#signup-modal').modal('toggle');
})

$('#submit-sign').on('click', function() {
	
	var lastName = $('#lastName').val().trim();
	var firstName = $('#firstName').val().trim();
	var userName = $('#userName-signup').val().trim();
	var password = $('#pass-signup').val().trim();
	var email = $('#email-signup').val().trim();
	var favBeer = $('#favBeer').val().trim();
	var city = $('#city').val().trim();
	var favBar = $('#favBar').val().trim();


	var currentUrl = window.location.origin;

	$.ajax({
		method: 'POST',
		url: currentUrl + '/signup',
		data: {
			lastName: lastName,
			firstName: firstName,
			userName: userName,
			password: password,
			email: email,
			favBeer: favBeer,
			favBar: favBar,
			city: city
		},
		success: function (response) {
			if(response == "success"){
				$('#modal-body').empty();
				$('#modal-body').html('<h2>Successfully signed up with Cask!</h2>');
				$('#submit-sign').remove();
			}
			else{

			}
		}
	})

	$('#lastName').val('');
	$('#firstName').val('');
	$('#userName-signup').val('');
	$('#pass-signup').val('');
	$('#email-signup').val('');
	$('#favBeer').val('');
	$('#city').val('');
	$('#favBar').val('');

});

$('#forgot-pass').on('click', function(){
	$('#forgot-modal').modal('toggle');
});

$('#submit-forgot').on('click', function(){
	var forgetfull = $('#input-forgot').val().trim();
	var currentUrl = window.location.origin;
	$.ajax({
		method: 'POST',
		url: currentUrl + '/forgot',
		data: {
			userName : forgetfull
		},
		success: function(response){
			if(response.success == 'success'){
				var password = response.userPass;
				var email = response.userEmail;
				$('#submit-forgot').remove();
				$.ajax({
					method: 'POST',
					url: currentUrl + '/test',
					data: {
						password: password,
						email: email 
					}
				})
			}
			else if(response == 'invalid'){
				console.log('this is not a valid username');
			}
		}
	})
})

















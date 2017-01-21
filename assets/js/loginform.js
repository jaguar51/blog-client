// Work with Login/Signup dialog
$('.loginBtn').click(function(event) {
	if (window.matchMedia('(max-width: 767px)').matches) {
		$('.loginBtn').attr('data-target','#navbarCollapse');
		$('.loginBtn').attr('data-toggle','collapse');
	} else {
		$('.loginBtn').removeAttr('data-target');
		$('.loginBtn').removeAttr('data-toggle');
	}
	$("#login-dialog").show();
	$('#tab-1').prop('checked',true);
});

$('.signUpBtn').click(function(event) {
	if (window.matchMedia('(max-width: 767px)').matches) {
		$('.signUpBtn').attr('data-target','#navbarCollapse');
		$('.signUpBtn').attr('data-toggle','collapse');
	} else {
		$('.signUpBtn').removeAttr('data-target');
		$('.signUpBtn').removeAttr('data-toggle');
	}
	$("#login-dialog").show();
	$('#tab-2').prop('checked',true);
});

$('.custom-close').click(function(event) {
	$("#login-dialog").hide();
});
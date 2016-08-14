$(document).ready(function(){
	$('.deleteUser').on('click', deleteUser)
});

function deleteUser(e){
	e.preventDefault();
	var check = confirm('Are you sure?');

	if(check){
		$.ajax({
			type: 'DELETE',
			url: '/users/delete/'+ $(this).data('id')
		}).done(function(res){

		});
		window.location.replace('/');
	} else {
		return false;
	}
}
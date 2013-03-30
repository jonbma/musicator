$(function () {
	$('#submission_reviewer_tokens').tokenInput('/reviewers.json', { 
		crossDomain: false ,
		propertyToSearch: "first_name",
		prePopulate: $('#submission_reviewer_tokens').data('pre'),
		tokenLimit: 1,
		theme: 'facebook',
		zindex: '11001',
    tokenValue: "first_name",
    
	});

});
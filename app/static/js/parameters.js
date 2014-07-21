$(document).ready(function () {

	$('#parametersForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	            periods: {
	                message: 'Periods value is not valid',
	                validators: {
	                    notEmpty: {
	                        message: 'The number of periods is required and cannot be empty'
	                    },
	                    digits: {
	                    	message: 'Periods must be a number'
	                    },	                    
	                    greaterThan: {
	                    	value: 1, 	
	                    	message: 'The number of periods must be greater than zero'
	                    }
	                }
	            },
	            p1: {
	                validators: {
	                    notEmpty: {
	                        message: 'The parameter is required and cannot be empty'
	                    }
	                }
	            },
	            p2: {
	                validators: {
	                    notEmpty: {
	                        message: 'The parameter is required and cannot be empty'
	                    }
	                }
	            }            
	        }
	    });

	$("#policy").change(function() {
		if ($(this).val() == "RS") {
			$("#p1").attr("placeholder", "R");
			$("#p2").attr("placeholder", "S");
		}
		if ($(this).val() == "Qs") {
			$("#p1").attr("placeholder", "Q");
			$("#p2").attr("placeholder", "s");
		}
	});
		
	// $("#policy").after("<p>meh</p>");
});

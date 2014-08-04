$(document).ready(function () {

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
		
});

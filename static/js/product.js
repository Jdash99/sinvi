$("#delete").on("click", function(){
	pname=$("#product").val();
	console.log(pname);
	$.ajax({
	  type: "POST",
	  url: "/delete_product",
	  data: JSON.stringify({"pname": pname}),
	  success: function(data) {
	  	$("#product option:selected").remove();
	  },
	  contentType: 'application/json'
	});
});

$.getJSON('/populate_select', function(data){
	var items = [];
	$.each( data, function( key, val ) {
		items.push('<option value="' + val.pname + '">' + val.pname + '</option>');
	});

    $('#product').append(items.join( "" ));
});

$("#demand_dist").change(function () {
	if ($(this).val() == "Constant") {
		$("#dp2_group").addClass("hidden");
		$("#dp3_group").addClass("hidden");
		$("#demandlabel_p1").text("Value");
	}	
	if ($(this).val() == "Normal") {
		// $("#dp3_group").toggleClass("hidden");
		$("#dp2_group").removeClass("hidden");
		$("#dp3_group").addClass("hidden");
		$("#demandlabel_p1").text("Mu");
		$("#demandlabel_p2").text("Sigma");
	}
	if ($(this).val() == "Triangular") {
		$("#dp2_group").removeClass("hidden");
		$("#dp3_group").removeClass("hidden");
		$("#demandlabel_p1").text("Minimun");
		$("#demandlabel_p2").text("Mode");
		$("#demandlabel_p3").text("Maximun");
	}
});

$("#leadtime_dist").change(function () {
	if ($(this).val() == "Constant") {
		$("#lp2_group").addClass("hidden");
		$("#lp3_group").addClass("hidden");
		$("#leadtimelabel_p1").text("Value");
	}
	if ($(this).val() == "Normal") {
		$("#lp2_group").removeClass("hidden");
		$("#lp3_group").addClass("hidden");
		$("#leadtimelabel_p1").text("Mu");
		$("#leadtimelabel_p2").text("Sigma");
	}
	if ($(this).val() == "Triangular") {
		$("#lp2_group").removeClass("hidden");
		$("#lp3_group").removeClass("hidden");
		$("#leadtimelabel_p1").text("Minimun");
		$("#leadtimelabel_p2").text("Mode");
		$("#leadtimelabel_p3").text("Maximun");
	}
});

$("#save_product").on('click', function(e){

	var name = $('#product_name').val();
	var price = $('#price').val();
	var order_cost = $('#order_cost').val();
	var initial_inventory = $('#initial_inventory').val();
	var demand_dist = $("#demand_dist").val();
	var demand_p1 = $("#demand_p1").val();
	var demand_p2 = $("#demand_p2").val();
	var demand_p3 = $("#demand_p3").val();
	var leadtime_dist = $("#leadtime_dist").val();
	var leadtime_p1 = $("#leadtime_p1").val();
	var leadtime_p2 = $("#leadtime_p2").val();
	var leadtime_p3 = $("#leadtime_p3").val();

	// If user confirms sends data to database 
	if (confirm("Confirm product information"))
		{
		    $.ajax({
				type : "POST",
				url : '/save_product',
				data: JSON.stringify({"name":name, "price":price, "order_cost": order_cost, 
									  "initial_inventory": initial_inventory, 'demand_dist':demand_dist,
									  "demand_p1": demand_p1, "demand_p2": demand_p2, "demand_p3":demand_p3,
									  "leadtime_dist": leadtime_dist, 'leadtime_p1':leadtime_p1, 
									  'leadtime_p2':leadtime_p2, 'leadtime_p3': leadtime_p3
									}),
				dataType:"json",
				contentType: 'application/json',
				success: function(data) {
					// Updates chart
					$('#myModal').modal('hide');
					}

			});

			//Add new product to list
			$('#product').append('<option value="' + name + '">' + name + '</option>');
		}

	return false;
}); 
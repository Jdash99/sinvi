//Step chart
var svg = dimple.newSvg("#stepContainer", 400, 300);
var start_data = [
{'FIP': 1, 'Periodo': 1},
{'FIP': 2, 'Periodo': 2},
{'FIP': 3, 'Periodo': 3},
{'FIP': 4, 'Periodo': 4},
];
var other_data = [
{'FIP': 1, 'Periodo': 1, 'Meh': 500},
{'FIP': 2, 'Periodo': 2, 'Meh': 500},
{'FIP': 3, 'Periodo': 3, 'Meh': 500},
{'FIP': 4, 'Periodo': 4, 'Meh': 500},
];
var stepChart = new dimple.chart(svg, other_data);
stepChart.setBounds(60, 50, 305, 205);
var xAxis = stepChart.addCategoryAxis("x", "Periodo");
var yAxis = stepChart.addMeasureAxis("y", "FIP");
//stepChart.addMeasureAxis("y", "Meh");
var s = stepChart.addSeries("Inventory Level", dimple.plot.line, [xAxis, yAxis]);
//stepChart.addSeries("Inventory Level", dimple.plot.line, [xAxis, 'Meh']);
s.interpolation = "step";
stepChart.addLegend(60, 10, 300, 20, "right");
stepChart.draw();

//Donut Chart
var svg = dimple.newSvg("#pieContainer", 400, 300);
var data = [
	{"TipoCosto":"Carrying", "Costo":2000 },
	{ "TipoCosto":"Stock-Out", "Costo":3000 },
	{ "TipoCosto":"Ordering", "Costo":8000 },
];
var donutChart = new dimple.chart(svg, data);
donutChart.addMeasureAxis("p", "Costo");
var ring = donutChart.addSeries("TipoCosto", dimple.plot.pie);
ring.innerRadius = "50%";
donutChart.assignColor("Carrying", "#F7464A", "white", 1);
donutChart.assignColor("Stock-Out", "#46BFBD", "white", 1);
donutChart.assignColor("Ordering", "#FFC870", "white", 1);

// Handle the hover event - overriding the default behaviour
ring.addEventHandler("mouseover", onHover);
// Handle the leave event - overriding the default behaviour
ring.addEventHandler("mouseleave", onLeave);
var donutLegend = donutChart.addLegend(60, 10, 300, 20, "left");
donutLegend.fontFamily = 'Oswald';
donutLegend.fontSize = 12;
donutChart.draw();

var currencyFormat = d3.format("$.2s")

function onHover(e) { 
  var path = e.selectedShape[0][0].attributes.d.value;

  var box = Raphael.pathBBox(path);           
  
  // Set the size and position of the popup
  var width = 150,
      height = 70,
      x = box.x + width + 100, 
      y = box.y + height + 130;

  // Create a group for the popup objects
  popup = svg.append("g");

  // Add a rectangle surrounding the text
  popup
  .append("rect")
  .attr("x",x)
  .attr("y",y)
  .attr("width", 100)
  .attr("height", 20)
  .attr("rx", 5)
  .attr("ry", 5)
  .attr("opacity", "0.8")
  .style("fill", 'black')
  .style("stroke", 'black')
  .style("stroke-width", 2);


  // Add multiple lines of text
  popup
  .append('text')
  .attr('x', x + 5)
  .attr('y', y + 15)
  .text(e.seriesValue[0] + ": " + currencyFormat(e.pValue))
  .style("font-family", 'Oswald')
  .style("font-size", 12)
  .style("fill", 'white')
}

function onLeave(e) {
  // Remove the popup
  if (popup !== null) {
    popup.remove();
  }
}

d3.select("#pieContainer").style("stroke-width", 5);

//Ajax call
// d3.select("#submit").on("click", function() {
// 	var periods = $('#periods').val();
// 	var policy = $('#policy').val();
// 	var p1 = $('#p1').val();
// 	var p2 = $('#p2').val();
// 	$.ajax({
// 		type : "POST",
// 		url : '/plot',
// 		data: JSON.stringify({"policy":policy, "periods":periods, "p1": p1, "p2": p2}),
// 		dataType:"json",
// 		contentType: 'application/json',
// 		success: function(data) {
// 			// Updates chart
// 			// stepChart.data = data[0]
// 			// stepChart.draw(1000);

// 			donutChart.data = data[1]
// 			donutChart.draw(1000);

// 			//cleanAxis(myAxis, 10);
// 			}

// 	});
// }); 

$("#parametersForm").on('submit', function(){
	var periods = $('#periods').val();
	var policy = $('#policy').val();
	var p1 = $('#p1').val();
	var p2 = $('#p2').val();
	$.ajax({
		type : "POST",
		url : '/plot',
		data: JSON.stringify({"policy":policy, "periods":periods, "p1": p1, "p2": p2}),
		dataType:"json",
		contentType: 'application/json',
		success: function(data) {
			// Updates chart
			stepChart.data = data[0]
			stepChart.draw(1000);

			donutChart.data = data[1]
			donutChart.draw(1000);

			//cleanAxis(myAxis, 10);
			}

	});
	return false;
}); 

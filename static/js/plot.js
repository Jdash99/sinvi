var cleanAxis = function (axis, labelEvery, tickEvery) {
    // This should have been called after draw, otherwise do nothing
    if (axis.shapes.length > 0) {
        var del = 0;
        // If there is an interval set
        if (labelEvery > 1) {
            // Operate on all the axis text
            axis.shapes.selectAll("text").each(function (d) {
                d3.select(this).attr("opacity", 1);
                // Remove all but the nth label
                if (del % labelEvery !== 0) {
                    d3.select(this).attr("opacity", 0); 
                }
                if (del % tickEvery !== 0) {
                    // Find the corresponding tick line and remove
                    axis.shapes.selectAll("line").each(function (d2) {
                        if (d === d2) {
                            d3.select(this).attr("opacity", 0); 
                        }
                    });
                }
                del += 1;
          });
        }
    }
};

var start_data = [];
for (var i = 1; i < 50; i ++) {
  start_data.push({'FIP': (Math.random() * 1000000), 'PERIOD': i });
}

//Step chart
var svg = dimple.newSvg("#stepContainer", 510, 300);
var stepChart = new dimple.chart(svg, start_data);
stepChart.setBounds(60, 50, 475, 205);
var xAxis = stepChart.addCategoryAxis("x", "PERIOD");
var yAxis = stepChart.addMeasureAxis("y", "FIP");
var s = stepChart.addSeries(null, dimple.plot.line);
s.interpolation = "step";

s.afterDraw = function () {
  var l = stepChart.data.length;
  if (l < 10) {
    cleanAxis(xAxis, 2, 1);
  }
  if (l >= 10 && l < 50) {
    cleanAxis(xAxis, 5, 2);
  }
  if (l >= 50 && l < 100) {
    cleanAxis(xAxis, 10, 2);
  }
  if (l >= 155) {
    cleanAxis(xAxis, 20, 5);
  }

};

stepChart.addLegend(60, 10, 300, 20, "right");
xAxis.fontFamily = "Ubuntu";
yAxis.fontFamily = "Ubuntu";
xAxis.fontSize = 12;
yAxis.fontSize = 12;
stepChart.draw();

//Donut Chart
var svg = dimple.newSvg("#pieContainer", 300, 300);
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
var donutLegend = donutChart.addLegend(35, 10, 300, 20, "left");
donutLegend.fontFamily = 'Ubuntu';
donutLegend.fontSize = 12;
donutChart.draw();

var currencyFormat = d3.format("$.2s");

function onHover(e) { 
  var path = e.selectedShape[0][0];

  var d3path = d3.select(path);
  
  var box = d3path.node().getBBox();          
  
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
  .attr('x', x + 2)
  .attr('y', y + 15)
  .text(e.seriesValue[0] + ": " + currencyFormat(e.pValue))
  .style("font-family", 'Ubuntu')
  .style("font-size", 12)
  .style("fill", 'white');
}

function onLeave(e) {
  // Remove the popup
  if (popup !== null) {
    popup.remove();
  }
}

// Set white space between categories
d3.select("#pieContainer").style("stroke-width", 5);

$("#parametersForm").on('submit', function(){

  var product = $('#product').val();
	var periods = $('#periods').val();
	var policy = $('#policy').val();
	var p1 = $('#p1').val();
	var p2 = $('#p2').val();
	$.ajax({
		type : "POST",
		url : '/plot',
		data: JSON.stringify({'product':product, "policy":policy, "periods":periods, "p1": p1, "p2": p2}),
		dataType:"json",
		contentType: 'application/json',
		success: function(data) {
			// Updates chart
			stepChart.data = data[0];
			stepChart.draw(1000);
			donutChart.data = data[1];
			donutChart.draw(1000);
			}

	});
	return false;
}); 

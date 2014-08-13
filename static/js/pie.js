$(document).ready(function () {
	var svg = dimple.newSvg("#pieContainer", 400, 300);
	var data = [
		{"TipoCosto":"Almacenamiento", "Costo":2000 },
		{ "TipoCosto":"Alistamiento", "Costo":3000 },
		{ "TipoCosto":"Financiero", "Costo":8000 },
	];
	var myChart = new dimple.chart(svg, data);

	myChart.addMeasureAxis("p", "Costo");
	var ring = myChart.addSeries("TipoCosto", dimple.plot.pie);
	ring.innerRadius = "50%";
	myChart.assignColor("Almacenamiento", "#F7464A", "white", 1);
	myChart.assignColor("Alistamiento", "#46BFBD", "white", 1);
	myChart.assignColor("Financiero", "#FDB45C", "white", 1);
	myChart.draw();
	d3.select("#pieContainer").style("stroke-width", 5);
});
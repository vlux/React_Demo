// var chart = AmCharts.makeChart("chartdiv", {
// 	"type": "serial",
// 	"theme": "light",
// 	"marginRight": 40,
// 	"marginLeft": 40,
// 	"autoMarginOffset": 20,
// 	"dataDateFormat": "YYYY-MM-DD",
// 	"valueAxes": [{
// 		"id": "v1",
// 		"axisAlpha": 0,
// 		"position": "left",
// 		"ignoreAxisWidth": true
// 	}],
// 	"balloon": {
// 		"borderThickness": 1,
// 		"shadowAlpha": 0
// 	},
// 	"graphs": [{
// 		"id": "g1",
// 		"balloon": {
// 			"drop": true,
// 			"adjustBorderColor": false,
// 			"color": "#ffffff"
// 		},
// 		"bullet": "round",
// 		"bulletBorderAlpha": 1,
// 		"bulletColor": "#FFFFFF",
// 		"bulletSize": 5,
// 		"hideBulletsCount": 50,
// 		"lineThickness": 2,
// 		"title": "red line",
// 		"useLineColorForBulletBorder": true,
// 		"valueField": "value",
// 		"balloonText": "<span style='font-size:18px;'>[[value]]</span>"
// 	}],
// 	"chartScrollbar": {
// 		"graph": "g1",
// 		"oppositeAxis": false,
// 		"offset": 30,
// 		"scrollbarHeight": 80,
// 		"backgroundAlpha": 0,
// 		"selectedBackgroundAlpha": 0.1,
// 		"selectedBackgroundColor": "#888888",
// 		"graphFillAlpha": 0,
// 		"graphLineAlpha": 0.5,
// 		"selectedGraphFillAlpha": 0,
// 		"selectedGraphLineAlpha": 1,
// 		"autoGridCount": true,
// 		"color": "#AAAAAA"
// 	},
// 	"chartCursor": {
// 		"pan": true,
// 		"valueLineEnabled": true,
// 		"valueLineBalloonEnabled": true,
// 		"cursorAlpha": 1,
// 		"cursorColor": "#258cbb",
// 		"limitToGraph": "g1",
// 		"valueLineAlpha": 0.2
// 	},
// 	"valueScrollbar": {
// 		"oppositeAxis": false,
// 		"offset": 50,
// 		"scrollbarHeight": 10
// 	},
// 	"categoryField": "date",
// 	"categoryAxis": {
// 		"parseDates": true,
// 		"dashLength": 1,
// 		"minorGridEnabled": true
// 	},
// 	"export": {
// 		"enabled": true
// 	},
// 	"dataProvider": [],
// });
//
// chart.addListener("rendered", zoomChart);
//
// zoomChart();
//
// function zoomChart() {
// 	chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length -
// 		1);
// }


var chartData = generateChartData();
console.log(chartData)
var chart = AmCharts.makeChart("chartdiv", {
	"type": "serial",
	"theme": "light",
	"legend": {
		"useGraphSettings": true
	},
	"dataProvider": chartData,
	"valueAxes": [{
		"id": "v1",
		"axisColor": "#FF6600",
		"axisThickness": 2,
		"gridAlpha": 0,
		"axisAlpha": 1,
		"position": "left"
	}, {
		"id": "v2",
		"axisColor": "#FCD202",
		"axisThickness": 2,
		"gridAlpha": 0,
		"axisAlpha": 1,
		"position": "right"
	}, {
		"id": "v3",
		"axisColor": "#B0DE09",
		"axisThickness": 2,
		"gridAlpha": 0,
		"offset": 50,
		"axisAlpha": 1,
		"position": "left"
	}],
	"graphs": [{
		"valueAxis": "v1",
		"lineColor": "#FF6600",
		"bullet": "round",
		"bulletBorderThickness": 1,
		"hideBulletsCount": 30,
		"title": "red line",
		"valueField": "visits",
		"fillAlphas": 0
	}, {
		"valueAxis": "v2",
		"lineColor": "#FCD202",
		"bullet": "square",
		"bulletBorderThickness": 1,
		"hideBulletsCount": 30,
		"title": "yellow line",
		"valueField": "hits",
		"fillAlphas": 0
	}, {
		"valueAxis": "v3",
		"lineColor": "#B0DE09",
		"bullet": "triangleUp",
		"bulletBorderThickness": 1,
		"hideBulletsCount": 30,
		"title": "green line",
		"valueField": "views",
		"fillAlphas": 0
	}],
	"chartScrollbar": {},
	"chartCursor": {
		"cursorPosition": "mouse"
	},
	"categoryField": "date",
	"categoryAxis": {
		"parseDates": true,
		"axisColor": "#DADADA",
		"minorGridEnabled": true
	},
	"export": {
		"enabled": true,
		"position": "bottom-right"
	}
});

chart.addListener("dataUpdated", zoomChart);
zoomChart();

// generate some random data, quite different range
function generateChartData() {
	var chartData = [];
	var firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 100);

	for (var i = 0; i < 100; i++) {
		var newDate = new Date(firstDate);
		newDate.setDate(newDate.getDate() + i);

		var visits = Math.round(Math.random() * 40) + 100;
		var hits = Math.round(Math.random() * 80) + 500;
		var views = Math.round(Math.random() * 6000);

		chartData.push({
			date: newDate,
			visits: visits,
			hits: hits,
			views: views
		});
	}
	return chartData;
}

function zoomChart() {
	chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length -
		1);
}

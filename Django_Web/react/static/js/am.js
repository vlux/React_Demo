var chartData = [];

function generatechartData() {
	var chartData = [];
	var firstDate = new Date();
	firstDate.setDate(firstDate.getDate() - 150);

	for (var i = 0; i < 150; i++) {
		var newDate = new Date(firstDate);
		newDate.setDate(newDate.getDate() + i);

		var visits = Math.round(Math.random() * 100 - 50);

		chartData.push({
			date: newDate,
			visits: visits
		});
	}
	return chartData;
}


var chart = AmCharts.makeChart("chartdiv", {
	"theme": "light",
	"type": "serial",
	// "marginRight": 80,
	"autoMarginOffset": 20,
	// "marginTop": 20,
	"dataProvider": chartData,
	"valueAxes": [{
		"id": "v1",
		"axisAlpha": 0.1
	}],
	"graphs": [{
		"balloonText": "[[category]]<br><b>value: [[value]]</b>",
		"lineColor": "#67b7dc",
		"valueField": "visits",
		// "bullet": "round",
		// "bulletBorderAlpha": 0.5,
		// "bulletBorderColor": "#FFFFFF",
		//"hideBulletsCount": 50,
		//"lineThickness": 2,
		//"useNegativeColorIfDown": true,
		//"negativeLineColor": "#fdd400",
	}],
	"chartScrollbar": {
		"scrollbarHeight": 5,
		"backgroundAlpha": 0.1,
		"backgroundColor": "#868686",
		"selectedBackgroundColor": "#67b7dc",
		"selectedBackgroundAlpha": 1
	},
	"chartCursor": {
		"valueLineEnabled": true,
		"valueLineBalloonEnabled": true
	},
	"categoryField": "date",
	"categoryAxis": {
		"parseDates": true,
		"axisAlpha": 0,
		"minHorizontalGap": 60,
		"axisColor": "#DADADA",
		"minorGridEnabled": true
	},
	"export": {
		"enabled": true
	}
});

chart.addListener("dataUpdated", zoomChart);
//zoomChart();

function zoomChart() {
	if (chart.zoomToIndexes) {
		chart.zoomToIndexes(130, chartData.length - 1);
	}
}

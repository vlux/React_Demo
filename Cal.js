var date = new Date();
var cal = new CalHeatMap();

function init() {
	cal.init({
		itemSelctor: '.cal-heatmap-container', //Dom to insert the cal
		domain: 'month',
		subDomain: 'x_day',
		start: date.setDate(date.getDate() - 180), // Default half year

		data: data, // date to view
		dataType: 'json',
		range: 6,
		// subDomainTextFormat:"%d",

		subDomainTextFormat: function(date, value) {
			return value;
		},

		domainLabelFormat: "%m-%Y",

		legendColors: {
			min: "#f4decd",
			max: "#ff1a1a",
			base: "#ededed",
			empty: "#ededed",
		},
		weekStartOnMonday: true,

		//CSS to adjust
		cellSize: 15,
		cellRadius: 1,
		cellPadding: 5,
		domainMargin: [0, 2],
		// colLimit:7,
		tooltip: true,
		// domainDynamicDimension: true,
	});
	setTimeout(function() {
		$(".graph>svg>svg>g>rect:not(.r1,.r2,.r3,.r4,.r5)").css("fill", "#ededed");
	}, 1000)
}

function cal(url) {
	$.ajax({
		dataType: "json",
		url: url,
		success: function(data) {
			cal.update(data);
		},
	});
	setTimeout(function() {
		$(".graph>svg>svg>g>rect:not(.r1,.r2,.r3,.r4,.r5)").css("fill", "#ededed");
	}, 1000)
}

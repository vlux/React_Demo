function draw_pie(divname, url) {
	var width = 750;
	var height = 600;
	var radius = Math.min(width, height) / 2;

	var hue = d3.scale.category10();

	var totalSize = 0,
		sort = [];

	var vis = d3.select(divname).append("svg:svg")
		.attr("width", width)
		.attr("height", height)
		.append("svg:g")
		.attr("id", "container")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var partition = d3.layout.partition()
		.size([2 * Math.PI, radius * radius])
		.value(function(d) {
			return d.size;
		});

	var arc = d3.svg.arc()
		.startAngle(function(d) {
			return d.x;
		})
		.endAngle(function(d) {
			return d.x + d.dx;
		})
		.innerRadius(function(d) {
			return Math.sqrt(d.y);
		})
		.outerRadius(function(d) {
			return Math.sqrt(d.y + d.dy);
		});

	d3.text(url, function(text) {
		var csv = d3.csv.parseRows(text);
		var json = buildHierarchy(csv);
		for (i = 0; i < json.children.length; ++i)
			sort.push(json.children[i].name)
		createVisualization(json);
	});

	function createVisualization(json) {
		drawLegend();

		vis.append("svg:circle")
			.attr("r", radius)
			.style("opacity", 0);

		var nodes = partition.nodes(json)
			.filter(function(d) {
				return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
			});

		var path = vis.data([json]).selectAll("path")
			.data(nodes)
			.enter().append("svg:path")
			.attr("display", function(d) {
				return d.depth ? null : "none";
			})
			.attr("d", arc)
			.style("fill", function(d) {
				return hue(d.name);
			})
			.style("opacity", 1)
			.attr("class", function(d) {
				return d.name
			})
			.on("mouseover", mouseover);

		totalSize = path.node().__data__.value;

		var percentage = (100 * json.children[0].value / totalSize).toPrecision(3);
		var percentageString = percentage + "%";
		if (percentage < 0.1)
			percentageString = "< 0.1%";

		var highlight = json.children[0].name;
		d3.select("#percentage")
			.text(percentageString);
		d3.select("#variety")
			.text(highlight)

		d3.selectAll("path")
			.style("opacity", 0.5);
		d3.selectAll('path.' + highlight).style("opacity", 1)
	};

	function mouseover(d) {
		var percentage = (100 * d.value / totalSize).toPrecision(3);
		var percentageString = percentage + "%";
		if (percentage < 0.1)
			percentageString = "< 0.1%";

		d3.select("#percentage")
			.text(percentageString);
		d3.select("#variety")
			.text(d.name)

		d3.selectAll("path")
			.style("opacity", 0.5);
		d3.select(this).style("opacity", 1)
	}

	function drawLegend() {
		var li = {
			w: 75,
			h: 30
		};

		var legend = d3.select("#legend").append("svg:svg")
			.attr("width", li.w)
			.attr("height", sort.length * (li.h + 5));
		var g = legend.selectAll("g")
			.data(sort)
			.enter().append("svg:g")
			.attr("transform", function(d, i) {
				return "translate(0," + i * (li.h + 5) + ")";
			});
		g.append("svg:rect")
			.attr("width", li.w)
			.attr("height", li.h)
			.style("fill", function(d) {
				return hue(d);
			});
		g.append("svg:text")
			.attr("x", li.w / 2)
			.attr("y", li.h / 2)
			.attr("dy", "0.35em")
			.attr("text-anchor", "middle")
			.text(function(d) {
				return d;
			});
	}

	function buildHierarchy(csv) {
		var root = {
			"name": "root",
			"children": []
		};
		for (var i = 0; i < csv.length; i++) {
			var sequence = csv[i][0];
			var size = +csv[i][1];
			if (isNaN(size)) {
				continue;
			}
			var parts = sequence.split("-");
			var currentNode = root;
			for (var j = 0; j < parts.length; j++) {
				var children = currentNode["children"];
				var nodeName = parts[j];
				var childNode;
				if (j + 1 < parts.length) {
					var foundChild = false;
					for (var k = 0; k < children.length; k++) {
						if (children[k]["name"] == nodeName) {
							childNode = children[k];
							foundChild = true;
							break;
						}
					}
					if (!foundChild) {
						childNode = {
							"name": nodeName,
							"children": []
						};
						children.push(childNode);
					}
					currentNode = childNode;
				} else {
					childNode = {
						"name": nodeName,
						"size": size
					};
					children.push(childNode);
				}
			}
		}
		return root;
	}
}

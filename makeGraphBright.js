
var data, store;

//	data read and store
d3.json("data/prn_data.json", function(err, g) {
	if (err) throw err;
	graph = g;
	data = $.extend(true, {}, g);
	userSelect();
});



drag = simulation => {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

function userSelect() {
	var e = document.getElementById("filterInput");
	var text = e.options[e.selectedIndex].value;
	filterId = text;
	console.log('filterId at userSelect', text);
	update()
}

var e = document.getElementById("filterInput");
e.addEventListener('change', function() {
	userSelect()
})

function arrangeLabels() {
	console.log('arranging labels');
	var move = 1;
	while(move > 0) {
		move = 0;
		svg.selectAll(".label")
		.each(function() {
			var that = this,
			a = this.getBoundingClientRect();
			svg.selectAll(".label")
			.each(function() {
				if(this != that) {
					var b = this.getBoundingClientRect();
					if((Math.abs(a.left - b.left) * 2 < (a.width + b.width)) &&
					(Math.abs(a.top - b.top) * 2 < (a.height + b.height))) {
						// overlap, move labels
						var dx = (Math.max(0, a.right - b.left) + Math.min(0, a.left - b.right)) * 0.01,
								dy = (Math.max(0, a.bottom - b.top) + Math.min(0, a.top - b.bottom)) * 0.02,
								tt = d3.transform(d3.select(this).attr("transform")),
								to = d3.transform(d3.select(that).attr("transform"));
						move += Math.abs(dx) + Math.abs(dy);
						to.translate = [ to.translate[0] + dx, to.translate[1] + dy ];
						tt.translate = [ tt.translate[0] - dx, tt.translate[1] - dy ];
						d3.select(this).attr("transform", "translate(" + tt.translate + ")");
						d3.select(that).attr("transform", "translate(" + to.translate + ")");
						a = this.getBoundingClientRect();
					}
				}
			});
		});
	}
}

function update() {
  let links = []
  let nodes = []
	console.log('filterID at update', filterId);

  if(filterId === "All"){
     links = data.links.map(d => Object.create(d));
     nodes = data.nodes.map(d => Object.create(d));
  } else {
    links = data.links.filter(d => d.source == filterId || d.target == filterId).map(d => Object.create(d));
    const otherPersons = links.map(d => d.source !== filterId ? d.source : d.target)
    nodes = data.nodes.filter(d => d.id == filterId || otherPersons.indexOf(d.id) >= 0).map(d => Object.create(d));
  }
  console.log('filterId', filterId);
  console.log('nodes', nodes);
  console.log('links', links);

  //	svg selection and sizing
  const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 10;

  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

  // TIPS: https://www.d3indepth.com/force-layout/
  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius * 10
      }));

      const gmscale = d3.scaleOrdinal()
      .domain(["Project", "Organisation", "Place", "Species", "Person", "Service", "Activity"])
      //.domain(graphDict.map(d => d.type)) // the name dimension (nominal))
			// bright colours
			.range(["#ff6700","#cc4bc2","#31afd4","#F9C846","#175676","#C3C3E6", "#7B3E19"]);
      // Safety Orange Blaze Orange, Fuschia Crayola, Cerulean Crayola, Maize Crayola, Blue Sapphire, Lavender Blue, Russet

      const scale = d3.scaleOrdinal(d3.schemeCategory10);

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("r", d => d.weight)
      .attr("fill", d => gmscale(d.type))
      .call(drag(simulation));

  var label = svg.selectAll("g")
						.data(nodes)
						.enter()
						.append("text")
					    .text(function (d) { return d.caption; })
					    .style("text-anchor", "middle")
					    .style("fill", "#555")
					    .style("font-family", "Arial")
					    .style("font-size", 12);


  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    label
      .attr("x", function(d){ return d.x; })
    	.attr("y", function (d) {return d.y - 15; })

  });

  return svg.node();
	arrangeLabels();


}

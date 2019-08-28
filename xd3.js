d3 = require("d3");
rsgg = require("./rsg-graph.js");
d3fs = require("d3-force-sampled");

fns = {
  clone: true,
  addNode: function(node) {
    d3nodes.push(node);
    return true;
  },
  addEdge: function(edge) {
    d3links.push({ source: edge.from, target: edge.to, width: 1 });
    return true;
  },
  addBFNode: function(node) {
    node.color = "#D2E5FF";
    d3nodes.push(node);
    return true;
  },
  addBFEdge: function(edge) {
    d3links.push({ source: edge.from, target: edge.to, width: 4 });
    return true;
  },
  addAppNode: function(node) {
    node.color = "#ea708b";
    d3nodes.push(node);
    return true;
  },
  addAppEdge: function(edge) {
    d3links.push({ source: edge.from, target: edge.to, width: 2 });
    return true;
  },
  addInterfaceNode: function(node) {
    node.color = "#9fd356";
    d3nodes.push(node);
    return true;
  },
  addProviderEdge: function(edge) {
    d3links.push({ source: edge.from, target: edge.to, width: 1 });
    return true;
  },
  addConsumerEdge: function(edge) {
    let checkf = n => d3nodes.map(n => n.id).includes(n);
    if (checkf(edge.from) && checkf(edge.to)) {
      d3links.push({ source: edge.from, target: edge.to, width: 1 });
      return true;
    }
    return false;
  },
  setup: function() {
    d3nodes = [];
    d3links = [];

    document.getElementById("d3container").innerHTML = "";

    svg = d3
      .select("#d3container")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 1000);
  },
  run: function(done) {
    var start = Date.now();
    simulation = d3
      .forceSimulation(d3nodes)
      .force("link", d3.forceLink(d3links).id(d => d.id))
      .force("charge", d3fs.forceManyBodySampled())
      .force("center", d3.forceCenter(500, 500));

    link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 1)
      .selectAll("line")
      .data(d3links)
      .join("line")
      .attr("stroke-width", d => d.width);

    node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(d3nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", d => d.color);

    text = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("paint-order", "stroke")
      .selectAll("text")
      .data(d3nodes)
      .enter()
      .append("text")
      .text(d => d.label)
      .attr("dy", "0.35em");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node.attr("cx", d => d.x).attr("cy", d => d.y);

      text.attr("x", d => d.x + 5).attr("y", d => d.y);
    });

    simulation.on("end", () => {
      simulation.on("end", () => {});
      done();
    });
  },
  counts: function() {
    return {
      nodes: d3nodes.length,
      edges: d3links.length
    };
  }
};

rsgg.test(fns);

viva = require("vivagraphjs");
rsgg = require("./rsg-graph.js");

fns = {
  addNode: function(node) {
    graph.addNode(node.id, {
      label: node.label
    });
    return true;
  },
  addEdge: function(edge) {
    graph.addLink(edge.from, edge.to, 1);
    return true;
  },
  addBFNode: function(node) {
    graph.addNode(node.id, {
      kind: "bf",
      label: node.label
    });
    return true;
  },
  addBFEdge: function(edge) {
    graph.addLink(edge.from, edge.to, 4);
    return true;
  },
  addAppNode: function(node) {
    graph.addNode(node.id, {
      kind: "app",
      label: node.label
    });
    return true;
  },
  addAppEdge: function(edge) {
    graph.addLink(edge.from, edge.to, 2);
    return true;
  },
  addInterfaceNode: function(node) {
    graph.addNode(node.id, {
      kind: "iface",
      label: node.label
    });
    return true;
  },
  addConsumerEdge: function(edge) {
    graph.addLink(edge.from, edge.to, 1);
    return true;
  },
  addProviderEdge: function(edge) {
    graph.addLink(edge.from, edge.to, 1);
    return true;
  },
  setup: function() {
    graph = viva.Graph.graph();
    graphics = viva.Graph.View.svgGraphics();
    nodeSize = 4;

    nodeColor = {
      bf: "#D2E5FF",
      app: "#ea708b",
      iface: "#9fd356"
    };

    graphics
      .node(function(node) {
        var ui = viva.Graph.svg("g");

        var svgText = viva.Graph.svg("text")
          .attr("x", "+4px")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .attr("paint-order", "stroke")
          .text(node.data ? node.data.label : "????");

        var img = viva.Graph.svg("circle")
          .attr("r", nodeSize)
          .attr(
			  "fill", 
			  node.data ? nodeColor[node.data.kind] : "#FF0000"
		  );

        ui.append(svgText);
        ui.append(img);

        return ui;
      })
      .placeNode(function(nodeUI, pos) {
        nodeUI.attr(
			"transform",
			"translate(" + pos.x + "," + pos.y + ")"
		);
      });

    graphics
      .link(function(link) {
        return viva.Graph.svg("line")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 1)
          .attr("stroke-width", link.data);
      })
      .placeLink(function(linkUI, fromPos, toPos) {
        linkUI
          .attr("x1", fromPos.x)
          .attr("y1", fromPos.y)
          .attr("x2", toPos.x)
          .attr("y2", toPos.y);
      });

    layout = viva.Graph.Layout.forceDirected(graph, {
      springLength: 20,
      springCoeff: 0.00005,
      dragCoeff: 0.03,
      gravity: -10.0,
      timeStep: 10
    });

    document.getElementById("vivacontainer").innerHTML = "";

    renderer = viva.Graph.View.renderer(graph, {
      container: document.getElementById("vivacontainer"),
      graphics: graphics,
      layout: layout,
      prerender: 5000
    });
  },
  run: function(done) {
    renderer.run();
    done();
  },
  stabilized: () => layout.lastMove < 51,
  counts: function() {
    return {
      nodes: graph.getNodesCount(),
      edges: graph.getLinksCount()
    };
  }
};

rsgg.test(fns);

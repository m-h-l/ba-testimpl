viva = require("vivagraphjs");
rsgg = require("./rsg-graph.js");

fns = {
  addNode: function(node) {
    graph.beginUpdate();
    graph.addNode(node.id, {
      label: node.label
    });
    graph.endUpdate();
    return true;
  },
  addEdge: function(edge) {
    graph.beginUpdate();
    graph.addLink(edge.from, edge.to, 1);
    graph.endUpdate();
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
    graphics = viva.Graph.View.webglGraphics();

    layout = viva.Graph.Layout.forceDirected(graph, {
      springLength: 20,
      springCoeff: 0.00005,
      dragCoeff: 0.03,
      gravity: -10.0,
      timeStep: 10
    });

    document.body.innerHTML = "";

    renderer = viva.Graph.View.renderer(graph, {
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
rsgg = require("./rsg-graph.js");

fns = {
  addNode: n => {
    s.graph.addNode({
      id: n.id,
      label: n.label,
      x: 0,
      y: 0,
      size: 1,
      color: "#f00"
    });
  },
  addEdge: e => {
    s.graph.addEdge({
      id: e.from + "/" + e.to,
      source: e.from,
      target: e.to
    });
  },
  addBFNode: function(n) {
    s.graph.addNode({
      id: n.id,
      label: n.label,
      x: 0,
      y: 0,
      size: 1,
      color: "#f00"
    });
  },
  addBFEdge: function(e) {
    s.graph.addEdge({
      id: e.from + "/" + e.to,
      source: e.from,
      target: e.to
    });
  },
  addAppNode: function(n) {
    s.graph.addNode({
      id: n.id,
      label: n.label,
      x: 0,
      y: 0,
      size: 1,
      color: "#f00"
    });
  },
  addAppEdge: function(e) {
    s.graph.addEdge({
      id: e.from + "/" + e.to,
      source: e.from,
      target: e.to
    });
  },
  addInterfaceNode: function(n) {
    try {
      s.graph.addNode({
        id: n.id,
        label: n.label,
        x: 0,
        y: 0,
        size: 1,
        color: "#f00"
      });
    } catch {
      console.log(n);
    }
  },
  addConsumerEdge: function(e) {
    try {
      s.graph.addEdge({
        id: e.from + "/" + e.to,
        source: e.from,
        target: e.to
      });
    } catch {
      console.log(e);
    }
  },
  addProviderEdge: function addProviderEdge(e) {
    try {
      s.graph.addEdge({
        id: e.from + "/" + e.to,
        source: e.from,
        target: e.to
      });
    } catch {
      console.log(e);
    }
  },
  setup: function() {
    s = new sigma("container");
    //s.startForceAtlas2({worker: false, barnesHutOptimize: false});
  },
  run: function(ping) {
    s.refresh();
    s.configNoverlap({ nodeMargin: 3.0, scaleNodes: 1.3 });
    s.startNoverlap();
    s.startForceAtlas2();
  },
  stop: function() {
    s.stopForceAtlas2();
  },
  stabilized: function(ping) {},
  counts: function() {
    return {
      nodes: s.graph.nodes().length,
      edges: s.graph.edges().length
    };
  },
  clone: true
};

rsgg.test(fns);

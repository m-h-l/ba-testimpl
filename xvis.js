vis = require("vis");
rsgg = require("./rsg-graph.js");

function idEdge(edge) {
  edge.id = edge.from + "-" + edge.to;
  return edge;
}

function checkInsaneEdge(edge) {
  return (
    data.nodes.getIds().includes(edge.from) == false ||
    data.nodes.getIds().includes(edge.to) == false
  );
}

fns = {
  addNode: function(node) {
    if (data.nodes.getIds().includes(node.id) == false) {
      data.nodes.add(node);
      network.fit();
      return true;
    }
    return false;
  },
  addEdge: function(edge) {
    if (checkInsaneEdge(edge)) {
      return false;
    }
    idEdge(edge);
    if (data.edges.getIds().includes(edge.id) == false) {
      data.edges.add(edge);
      return true;
    }
    return false;
  },
  addBFNode: function(node) {
    node.mass = 20;
    node.shape = "box";
    if (data.nodes.getIds().includes(node.id) == false) {
      data.nodes.add(node);
      return true;
    }
    return false;
  },
  addBFEdge: function(edge) {
    if (checkInsaneEdge(edge)) {
      return false;
    }
    idEdge(edge);
    if (data.edges.getIds().includes(edge.id) == false) {
      edge.width = 8;
      edge.arrow = "to";
      data.edges.add(edge);
      return true;
    }
    return false;
  },
  addAppNode: function(node) {
    node.color = "#ea708b";
    node.shape = "box";
    node.mass = 10;
    if (data.nodes.getIds().includes(node.id) == false) {
      data.nodes.add(node);
      return true;
    }
    return false;
  },
  addAppEdge: function(edge) {
    if (checkInsaneEdge(edge)) {
      return false;
    }
    idEdge(edge);
    edge.width = 8;
    edge.color = {
      color: "#ea708b",
      inherit: "false"
    };
    edge.dashes = true;
    data.edges.add(edge);
    return true;
  },
  addInterfaceNode: function(node) {
    node.color = "#9fd356";
    node.shape = "box";
    if (data.nodes.getIds().includes(node.id) == false) {
      data.nodes.add(node);
      return true;
    }
    return false;
  },
  addConsumerEdge: function(edge) {
    if (checkInsaneEdge(edge)) {
      return false;
    }
    idEdge(edge);
    if (data.edges.getIds().includes(edge.id) == false) {
      edge.label = "CONSUMES";
      edge.arrows = "from";
      edge.color = {
        color: "#777777",
        inherit: "false"
      };
      data.edges.add(edge);
      return true;
    }
    return false;
  },
  addProviderEdge: function(edge) {
    if (checkInsaneEdge(edge)) {
      return false;
    }
    idEdge(edge);
    if (data.edges.getIds().includes(edge.id) == false) {
      edge.label = "PROVIDES";
      edge.arrows = "middle,to";
      edge.color = {
        color: "#777777",
        inherit: "false"
      };
      data.edges.add(edge);
      return true;
    }
    return false;
  },
  setup: function() {
    nodes = new vis.DataSet([]);
    edges = new vis.DataSet([]);

    data = {
      nodes: nodes,
      edges: edges
    };

    options = {
      layout: {
        improvedLayout: false
      }
    };
  },
  run: function(done) {
    var container = document.getElementById("visd");
    network = new vis.Network(container, data, options);
    network.once("stabilized", x => {
      done();
    });
  },
  stabilized: function(ping) {
    network.once("stabilized", x => {
      ping();
    });
  },
  counts: function() {
    return {
      nodes: data.nodes.length,
      edges: data.edges.length
    };
  }
};

rsgg.test(fns);

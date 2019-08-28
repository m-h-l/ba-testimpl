cytoscape = require("cytoscape");
rsgg = require("./rsg-graph.js");

fns = {
  clone: true,
  addNode: function(node) {
    cy.add({ data: node });
    return true;
  },
  addEdge: function(edge) {
    cy.add({ 
		group: "edges", 
		data: { source: edge.from, target: edge.to } 
	});
    return true;
  },
  addBFNode: function(node) {
    node.kind = "bf";
    cy.add({ data: node });
    return true;
  },
  addBFEdge: function(edge) {
    cy.add({
      group: "edges",
      data: { source: edge.from, target: edge.to, kind: "bf" }
    });
    return true;
  },
  addAppNode: function(node) {
    node.kind = "app";
    cy.add({ data: node });
    return true;
  },
  addAppEdge: function(edge) {
    cy.add({
      group: "edges",
      data: { source: edge.from, target: edge.to, kind: "app" }
    });
    return true;
  },
  addInterfaceNode: function(node) {
    try {
      node.kind = "iface";
      cy.add({ data: node });
      return true;
    } catch {
      return false;
    }
  },
  addConsumerEdge: function(edge) {
    try {
      cy.add({
        group: "edges",
        data: { source: edge.from, target: edge.to, kind: "consume" }
      });
      return true;
    } catch {
      return false;
    }
  },
  addProviderEdge: function(edge) {
    try {
      cy.add({
        group: "edges",
        data: { source: edge.from, target: edge.to, kind: "provide" }
      });
      return true;
    } catch {
      return false;
    }
  },
  setup: function() {
    cy = cytoscape({
      container: document.getElementById("cy"),
      style: [
        {
          selector: "node",
          style: {
            shape: "round-rectangle",
            label: "data(label)",
            width: "label",
            height: "label",
            "text-halign": "center",
            "text-valign": "center",
            padding: "3px",
            "border-width": "1px",
            "border-style": "solid",
            "border-color": "#000000"
          }
        },
        {
          selector: 'node[kind="bf"]',
          style: {
            "background-color": "#2B7CE9"
          }
        },
        {
          selector: 'node[kind="app"]',
          style: {
            "background-color": "#ea708b"
          }
        },
        {
          selector: 'node[kind="iface"]',
          style: {
            "background-color": "#9fd356"
          }
        },
        {
          selector: "edge",
          style: {
            color: "#777777",
            "line-color": "#777777",
            "curve-style": "straight",
            "text-outline-color": "#FFFFFF",
            "text-outline-width": "2"
          }
        },
        {
          selector: 'edge[kind="bf"]',
          style: {
            width: 5,
            "line-color": "#2B7CE9",
            "source-arrow-color": "#2B7CE9",
            "source-arrow-shape": "triangle"
          }
        },
        {
          selector: 'edge[kind="app"]',
          style: {
            width: 5,
            "line-color": "#ea708b",
            "line-style": "dashed",
            "line-dash-pattern": [3, 3]
          }
        },
        {
          selector: 'edge[kind="consume"]',
          style: {
            width: 2,
            "source-arrow-color": "#777777",
            "source-arrow-shape": "triangle",
            label: "consumes"
          }
        },
        {
          selector: 'edge[kind="provide"]',
          style: {
            width: 2,
            "target-arrow-color": "#777777",
            "target-arrow-shape": "triangle",
            label: "provides"
          }
        }
      ]
    });
  },
  run: function(done) {
    cy.on("layoutstop", e => {
      done();
    });
    cy.layout({
        name: "cose",
        randomize: true,
        animate: true,
        fit: true
      }).run();
  },
  stabilized: ping => {
    layout.on("layoutstop", e => {
      ping();
    });
  },
  counts: function() {
    return {
      nodes: cy.elements("node").length,
      edges: cy.elements("edge").length
    };
  }
};

rsgg.test(fns);
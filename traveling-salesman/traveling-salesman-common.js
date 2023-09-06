export { delay, Graph, Vertex, Edge, TravelingSalesman };

/* The `delay` function is a helper function that returns a promise that resolves after a
specified amount of time. It is used to introduce a delay or pause in the execution of
code. The `delay` function takes a parameter `time` which represents the time in
milliseconds to delay. */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/* The `TravelingSalesman` class is a solver for the traveling salesman problem. It represents a
graph and provides methods to calculate distances between vertices, convert distances to a
matrix, and solve the problem by finding the best order in which to visit the vertices,
minimizing the total distance traveled. */
class TravelingSalesman {
    /*const*/ graph = new Graph();
    /*const*/ arrayXY = [];
    /*let*/ solved = false;
    /*let*/ distanceMatrix = null;

    /*function*/ calculateDistanceEdges() {
        for (var i = 0; i < this.graph.vertices.length; i++) {
            const v = this.graph.vertices[i];
            this.graph.addEdge(v, v, 0);
        }
        for (var i = 0; i < this.graph.vertices.length; i++) {
            const from = this.graph.vertices[i];
            for (var j = 0; j < i; j++) {
                const to = this.graph.vertices[j];
                const distance = this.euclideanDistance(from, to);
                this.graph.addEdge(from, to, distance);
                this.graph.addEdge(to, from, distance);
            }
        }
    }

    /*function*/ convertDistanceEdgesToMatrix() {
        let distanceMatrix = [];
        for (var i = 0; i < this.graph.vertices.length; i++) {
            const row = [];
            const from = this.graph.vertices[i];
            for (var j = 0; j < this.graph.vertices.length; j++) {
                const to = this.graph.vertices[j];
                if (from === to) {
                    row.push(0);
                } else {
                    const edge = this.graph.getEdge(from, to);
                    row.push(edge ? edge.weight : Infinity);
                }
            }
            distanceMatrix.push(row);
        }
        this.distanceMatrix = math.matrix(distanceMatrix);
        return this.distanceMatrix;
    }

    /* The `calculateBestOrder` function is a part of a traveling salesman problem solver.
    It takes an array of vertices and calculates the best order in which to visit them,
    minimizing the total distance traveled. It does this by iteratively selecting the
    nearest vertex to the current vertex and adding it to a new ordered array. The
    function uses the `euclideanDistance` function to calculate the distance between two
    vertices. The process continues until all vertices have been visited. */
    async /*function*/ solve(stepDelay = -1) {
        if (this.solved) return this.arrayXY;
        this.arrayXY = this.graph.vertices.slice();
        const newOrder = [];
        const start = this.arrayXY[0];
        newOrder.push(start);
        this.arrayXY.splice(0, 1);
        while (this.arrayXY.length > 0) {
            let nearest = null;
            let nearestDistance = Number.MAX_VALUE;
            for (var i = 0; i < this.arrayXY.length; i++) {
                const distance = this.cachedEuclideanDistance(newOrder[newOrder.length - 1], this.arrayXY[i]);
                if (distance < nearestDistance) {
                    nearest = this.arrayXY[i];
                    nearestDistance = distance;
                }
            }
            if (stepDelay && stepDelay > 0) await delay(stepDelay);
            newOrder.push(nearest);
            this.arrayXY.splice(this.arrayXY.indexOf(nearest), 1);
        }
        this.arrayXY = newOrder;
        this.solved = true;
        return this.arrayXY;
    }

    /* The `euclideanDistance` function calculates the Euclidean distance between two points in a
    two-dimensional space. It takes two parameters `from` and `to`, which represent the
    coordinates of the two points. The function uses the formula `Math.sqrt(Math.pow(from.x -
    to.x, 2) + Math.pow(from.y - to.y, 2))` to calculate the distance. It subtracts the
    x-coordinates and y-coordinates of the two points, squares the differences, adds them
    together, and then takes the square root of the sum to get the Euclidean distance. */
    /*function*/ euclideanDistance(from, to) {
        return sqrt(pow(from.x - to.x, 2) + pow(from.y - to.y, 2));
    }

    cachedEuclideanDistance(from, to) {
        return this.distanceMatrix._data[Number(from.name)][Number(to.name)];
    }
}

/* The `class Graph` is a representation of a graph data structure. It has properties `edges` and
`vertices`, which are arrays that store the edges and vertices of the graph, respectively. The class
provides methods to add and remove vertices and edges, as well as methods to find vertices and edges
by name or by their startpoint and endpoint. */
class Graph {
    edges;
    vertices;

    constructor() {
        this.edges = [];
        this.vertices = [];
    }

    /* The `indexOfEdge` method in the `Graph` class is used to find the index of a specific edge in
    the `edges` array of the graph. It takes one parameter `edge`, which represents the edge to be
    found. The method searches through the `edges` array and returns the index of the first
    occurrence of the specified edge. If the edge is not found, the method returns -1. */
    indexOfEdge(edge) {
        return this.edges.indexOf(edge);
    }

    /* The `indexOfVertex` method in the `Graph` class is used to find the index of a vertex in the
    `vertices` array of the graph. It takes one parameter `vertex`, which represents the vertex to
    be found. The method searches through the `vertices` array and returns the index of the first
    occurrence of the specified vertex. If the vertex is not found, the method returns -1. */
    indexOfVertex(vertex) {
        return this.vertices.indexOf(vertex);
    }

    /* The `addVertex` method in the `Graph` class is used to add a vertex to the graph. It takes one
    parameter `name`, which represents the name or identifier of the vertex. */
    addVertex(name) {
        const vertex = new Vertex(name);
        this.vertices.push(vertex);
        return vertex;
    }

    /* The `removeVertex` method in the `Graph` class is used to remove a vertex from the graph. It
    takes one parameter `vertex`, which represents the vertex to be removed. */
    removeVertex(vertex) {
        this.vertices = this.vertices.filter(v => v !== vertex);
        vertex.outgoingEdges.forEach(e => this.removeEdge(e));
        vertex.incomingEdges.forEach(e => this.removeEdge(e));
    }

    /* The `addEdge` method in the `Graph` class is used to add an edge to the graph. It takes three
    parameters: `startpoint`, `endpoint`, and `weight`. */
    addEdge(startpoint, endpoint, weight) {
        const edge = new Edge(startpoint, endpoint, weight);
        this.edges.push(edge);
        startpoint.outgoingEdges.push(edge);
        endpoint.incomingEdges.push(edge);
        return edge;
    }

    /* The `removeEdge` method in the `Graph` class is used to remove an edge from the graph. It takes
    one parameter `edge`, which represents the edge to be removed. */
    removeEdge(edge) {
        this.edges = this.edges.filter(e => e !== edge);
        edge.startpoint.outgoingEdges = edge.startpoint.outgoingEdges.filter(e => e !== edge);
        edge.endpoint.incomingEdges = edge.endpoint.incomingEdges.filter(e => e !== edge);
    }

    /* The `vertexByName` method in the `Graph` class is used to find a vertex in the graph based on
    its name. It takes one parameter `name`, which represents the name of the vertex. The method
    searches through the `vertices` array of the graph and returns the first vertex that has a
    matching name. If no vertex with the specified name is found, the method returns `undefined`. */
    vertexByName(name) {
        return this.vertices.find(v => v.name === name);
    }

    /* alias for `vertexByName` */
    getVertex(name) {
        return this.vertexByName(name);
    }

    /* The `edgeByVertices` method in the `Graph` class is used to find an edge in the graph based on
    its startpoint and endpoint vertices. It takes two parameters `startpoint` and `endpoint`, which
    represent the startpoint and endpoint vertices of the edge. */
    edgeByVertices(startpoint, endpoint) {
        return this.edges.find(e => e.startpoint === startpoint && e.endpoint === endpoint);
    }

    /* alias for `edgeByVertices` */
    getEdge(startpoint, endpoint) {
        return this.edgeByVertices(startpoint, endpoint);
    }
}

/* The `class Vertex` is a representation of a vertex in a graph data structure. It has properties
`name`, `outgoingEdges`, and `incomingEdges`. The `name` property represents the name or identifier
of the vertex. The `outgoingEdges` property is an array that stores the edges that start from this
vertex. The `incomingEdges` property is an array that stores the edges that end at this vertex. */
class Vertex {
    name;
    outgoingEdges;
    incomingEdges;

    constructor(name) {
        this.name = name;
        this.outgoingEdges = [];
        this.incomingEdges = [];
    }
}

/* The `class Edge` is a representation of an edge in a graph data structure. It has properties
`startpoint`, `endpoint`, and `weight`. The `startpoint` property represents the vertex where the
edge starts, the `endpoint` property represents the vertex where the edge ends, and the `weight`
property represents the weight or cost associated with the edge. */
class Edge {
    startpoint;
    endpoint;
    weight;

    constructor(startpoint, endpoint, weight) {
        this.startpoint = startpoint;
        this.endpoint = endpoint;
        this.weight = weight ? weight : 1;
    }
}

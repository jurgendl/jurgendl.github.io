import { TravelingSalesman, delay as waitFor } from './traveling-salesman-common.js';

const traveler = new TravelingSalesman();

const sketchConfig = {
    fps: 60,
    randomNodes: 10,
    dotRadius: 30,
    sketchInset: 50,
    sketchW: 1024,
    sketchH: 768,
    rw: 1024/*sketchW*/ - (50/*sketchInset*/ * 2),
    rh: 768/*sketchH*/ - (50/*sketchInset*/ * 2),
    delay: 2000, // delay beofre solving
    stepDelay: 100, // delay between steps during solving
};

function setup() {
    if (sketchConfig.fps && 0 <= sketchConfig.fps && sketchConfig.fps <= 60) frameRate(sketchConfig.fps);
    createCanvas(sketchConfig.sketchW, sketchConfig.sketchH);

    for (var i = 0; i < sketchConfig.randomNodes; i++) {
        const vertex = traveler.graph.addVertex('' + i);
        vertex.x = Math.random() * sketchConfig.rw;
        vertex.y = Math.random() * sketchConfig.rh;
    }
    console.log(traveler.graph);

    traveler.calculateDistanceEdges();
    const distanceMatrix = traveler.convertDistanceEdgesToMatrix();
    console.log(distanceMatrix);
    console.log(JSON.stringify(distanceMatrix._data, null, "\t"));

    traveler.arrayXY = traveler.graph.vertices.slice();

    // wait a second before starting
    // wait 0.1 seconds (stepDelay) between each step
    waitFor(sketchConfig.delay).then(() => traveler.solve(sketchConfig.stepDelay));
}

function draw() {
    strokeWeight(2);
    background(0);

    noFill();
    beginShape();
    let distance = 0;
    for (var i = 0; i < traveler.arrayXY.length - 1; i++) {
        const from = traveler.arrayXY[i];
        const to = traveler.arrayXY[i + 1];
        distance += traveler.cachedEuclideanDistance(from, to);
        const r = 255 / traveler.arrayXY.length * i;
        const g = 255 - r;
        const b = 0;
        stroke(r, g, b);
        line(sketchConfig.sketchInset + from.x, sketchConfig.sketchInset + from.y, sketchConfig.sketchInset + to.x, sketchConfig.sketchInset + to.y);
    }
    endShape();

    stroke(255);
    strokeWeight(1);
    fill(255);
    textSize(28);
    textAlign(CENTER, CENTER);
    text('' + round(distance, 2), 70, 24);

    fill(0);
    for (var i = 0; i < traveler.arrayXY.length; i++) {
        const vertex = traveler.arrayXY[i];
        ellipse(sketchConfig.sketchInset + vertex.x, sketchConfig.sketchInset + vertex.y, sketchConfig.dotRadius, sketchConfig.dotRadius);
    }
    noFill();
    stroke(255);
    for (var i = 0; i < traveler.arrayXY.length; i++) {
        const vertex = traveler.arrayXY[i];
        ellipse(sketchConfig.ketchInset + vertex.x, sketchConfig.sketchInset + vertex.y, sketchConfig.dotRadius, sketchConfig.dotRadius);
    }

    strokeWeight(1);
    textSize(12);
    textAlign(CENTER, CENTER);
    for (var i = 0; i < traveler.graph.vertices.length; i++) {
        const vertex = traveler.graph.vertices[i];
        text('' + i, sketchConfig.sketchInset + vertex.x, sketchConfig.sketchInset + vertex.y);
    }
}

window.setup = setup;
window.draw = draw;

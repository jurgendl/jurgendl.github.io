const A_STAR_MAZE_WALKER_defRows = 10; // default number of rows
const A_STAR_MAZE_WALKER_defCols = 10; // default number of columns

class Coordinate {
    static toCoordinate(obj, columns) {
        return new Coordinate(obj.r, obj.c, columns);
    }

    c;//x
    r;//y
    i;//index in single dimension array

    constructor(r, c, columns) {
        this.r = r;
        this.c = c;
        this.i = this.r * columns + this.c;
    }

    toString() {
        return `(${this.r},${this.c})`;
    }

    equals(p) {
        return this.r == p.r && this.c == p.c;
    }

    compare(p) {
        return this.i < p.i ? -1 : this.i > p.i ? 1 : 0;
    }
}

class CoordinateArray extends Array {
    sortCoordinates() {
        this.sort((a, b) => a.i - b.i);
    }

    containsCoordinate(coordinate) {
        return this.positionOfCoordinate(coordinate) != -1;
    }

    positionOfCoordinate(coordinate) {
        for (let i = 0; i < this.length; i++) if (this[i].equals(coordinate)) return i;
        return -1;
    }

    lookUpCoordinate(coordinate) {
        return this[this.positionOfCoordinate(coordinate)];
    }

    removeCoordinate(coordinate) {
        const index = this.positionOfCoordinate(coordinate);
        if (index > -1) this.splice(index, 1);
    }

    addCoordinate(r, c, columns) {
        this.push(new Coordinate(r, c, columns));
    }
}

const A_STAR_MAZE_WALKER_L = 10; // unit for distance of neighbours in a straight line: ( 1 ) * 10
const A_STAR_MAZE_WALKER_LD = 14; // diagonal: √( L^2 + L^2 ) * 10 [rounded to 0 decimal places]
class AStarMazeWalker {
    closed = new CoordinateArray();
    open = new CoordinateArray();
    current = null;
    obstacles = new CoordinateArray();
    columns = A_STAR_MAZE_WALKER_defCols; // number of columns
    rows = A_STAR_MAZE_WALKER_defRows; // number of rows
    cutCorners = false; // allow diagonal movement through corners
    goal = null; // goal cell
    start = null; // start cell
    horizontalWalls = new CoordinateArray(); // blocked by wall to the bottom
    verticalWalls = new CoordinateArray(); // blocked by wall to the right
    iterations = 0; // total calculation iterations
    solvedPath = null; // path from start to goal
    foundGoal = false; // goal found
    noPathToGoal = false; // no path from start to goal

    // copy setup from another data object
    fromData(data) {
        this.clear();
        data.obstacles.forEach(o => this.obstacles.push(Coordinate.toCoordinate(o, data.columns)));
        this.columns = data.columns;
        this.rows = data.rows;
        this.cutCorners = data.cutCorners;
        this.goal = Coordinate.toCoordinate(data.goal, data.columns);
        this.start = Coordinate.toCoordinate(data.start, data.columns);
        data.horizontalWalls.forEach(o => this.horizontalWalls.push(Coordinate.toCoordinate(o, data.columns)));
        data.verticalWalls.forEach(o => this.verticalWalls.push(Coordinate.toCoordinate(o, data.columns)));
    }

    // clear all data
    clear() {
        this.reset();
        this.obstacles = new CoordinateArray();
        this.goal = null;
        this.start = null;
        this.horizontalWalls = new CoordinateArray();
        this.verticalWalls = new CoordinateArray();
    }

    // reset to initial state
    reset() {
        this.closed = new CoordinateArray();
        this.open = new CoordinateArray();
        this.current = null;
        this.neighbours = new CoordinateArray();
        this.neighboursOpen = new CoordinateArray();
        this.iterations = 0;
        this.solvedPath = null;
        this.noPathToGoal = false;
        this.foundGoal = false;
    }

    setup() {
        this.start.g = 0; // distance from start to start is 0 (obviously): number is used by first calculation step
        this.current = this.start; // start cell should be added as current for first calculation step
        this.obstacles.sortCoordinates(); // sort obstacles for faster lookUpCoordinate
    }

    // all neighbours of a point including diagonals even if they are blocked or out of bounds (for the purpose of checking if a point is a neighbour of another point)
    allNeighboursOf(coordinate) {
        let neighbours = new CoordinateArray();
        // A B C
        // D . E
        // F G H
        neighbours.addCoordinate(coordinate.r - 1, coordinate.c - 1, this.columns); // A
        neighbours.addCoordinate(coordinate.r - 1, coordinate.c, this.columns); // B
        neighbours.addCoordinate(coordinate.r - 1, coordinate.c + 1, this.columns); // C
        neighbours.addCoordinate(coordinate.r, coordinate.c - 1, this.columns); // D
        neighbours.addCoordinate(coordinate.r, coordinate.c + 1, this.columns); // E
        neighbours.addCoordinate(coordinate.r + 1, coordinate.c - 1, this.columns); // F
        neighbours.addCoordinate(coordinate.r + 1, coordinate.c, this.columns); // G
        neighbours.addCoordinate(coordinate.r + 1, coordinate.c + 1, this.columns); // H
        return neighbours;
    }

    insideBounds(n) {
        return (0 <= n.r && n.r < this.rows) && (0 <= n.c && n.c < this.columns);
    }

    // all neighbours of a point that are not blocked or out of bounds, and that are not already closed (handled)
    possibleNeighboursOf(coordinate) {
        let neighbours = this.allNeighboursOf(coordinate);
        // filter out out of bounds
        neighbours = neighbours.filter(n => this.insideBounds(n));
        // filter out those already closed (handled)
        neighbours = neighbours.filter(n => !this.closed.containsCoordinate(n));
        // filter out those blocked by obstacles
        neighbours = neighbours.filter(n => !this.isBlockedByObstacle(coordinate, n));
        // filter out those blocked by walls
        neighbours = neighbours.filter(n => !this.isBlockedByWall(coordinate, n));
        return neighbours;
    }

    // update direction label (arrow)
    getCoordinateLabel(parentCoordinate, childCoordinate) {
        if (parentCoordinate.r == childCoordinate.r) return parentCoordinate.c > childCoordinate.c ? '→' : '←';
        if (parentCoordinate.c == childCoordinate.c) return parentCoordinate.r > childCoordinate.r ? '↓' : '↑';
        if (parentCoordinate.r > childCoordinate.r) return parentCoordinate.c > childCoordinate.c ? '↘' : '↙';
        if (parentCoordinate.r < childCoordinate.r) return parentCoordinate.c > childCoordinate.c ? '↗' : '↖';
        return null;
    }

    isBlockedByObstacle(fromCoordinate, toCoordinate) {
        // targetCoordinate is obstacle: blocked
        if (this.obstacles.containsCoordinate(toCoordinate)) return true;

        // straight movement never blocked by obstacles
        if (fromCoordinate.r == toCoordinate.r || fromCoordinate.c == toCoordinate.c) return false;

        // other neighbours in square
        const coordinate1 = new Coordinate(fromCoordinate.r, toCoordinate.c, this.colums);
        const coordinate2 = new Coordinate(toCoordinate.r, fromCoordinate.c, this.colums);

        // filter out movement between obstacles if cutCorners
        // n X
        // X n
        // 
        // X n
        // n X

        // filter out movement close to corners if not cutCorners
        // n X
        // . n
        // 
        // X n
        // n .

        return this.cutCorners ? (this.obstacles.containsCoordinate(coordinate1) && this.obstacles.containsCoordinate(coordinate2)) : (this.obstacles.containsCoordinate(coordinate1) || this.obstacles.containsCoordinate(coordinate2));
    }

    isBlockedByWall(fromCoordinate, toCoordinate) {
        if (fromCoordinate.c == toCoordinate.c) { // vertical up or down
            if (fromCoordinate.r + 1 == toCoordinate.r) {
                // fromCoordinate
                // ↓
                // toCoordinate
                if (this.horizontalWalls.containsCoordinate(fromCoordinate)) return true;
            } else /* if (fromCoordinate.r == toCoordinate.r + 1) */ {
                // toCoordinate
                // ↑
                // fromCoordinate 
                if (this.horizontalWalls.containsCoordinate(toCoordinate)) return true;
            }
        } else if (fromCoordinate.r == toCoordinate.r) { // move left or right
            if (fromCoordinate.c + 1 == toCoordinate.c) {
                // fromCoordinate → toCoordinate
                if (this.verticalWalls.containsCoordinate(fromCoordinate)) return true;
            } else /* if (fromCoordinate.c == toCoordinate.c + 1) */ {
                //  toCoordinate ← fromCoordinate
                if (this.verticalWalls.containsCoordinate(toCoordinate)) return true;
            }
        } else /* if (fromCoordinate.r != toCoordinate.r && fromCoordinate.c != toCoordinate.c) */ { // diagonal move
            const topLeftPoint = new Coordinate(Math.min(fromCoordinate.r, toCoordinate.r), Math.min(fromCoordinate.c, toCoordinate.c), this.colums);
            const topRightPoint = new Coordinate(topLeftPoint.r, topLeftPoint.c + 1, this.colums);
            const bottomLeftPoint = new Coordinate(topLeftPoint.r + 1, topLeftPoint.c, this.colums);
            if (this.cutCorners) {
                if (this.horizontalWalls.containsCoordinate(topLeftPoint) && this.horizontalWalls.containsCoordinate(topRightPoint)) return true;
                if (this.verticalWalls.containsCoordinate(topLeftPoint) && this.verticalWalls.containsCoordinate(bottomLeftPoint)) return true;
            } else {
                if (this.horizontalWalls.containsCoordinate(topLeftPoint)) return true;
                if (this.verticalWalls.containsCoordinate(topLeftPoint)) return true;
                if (this.horizontalWalls.containsCoordinate(topRightPoint)) return true;
                if (this.verticalWalls.containsCoordinate(bottomLeftPoint)) return true;
            }
        }
        return false;
    }

    // Euclidean distance between points
    //  d = √[(x2 – x1)^2 + (y2 – y1)^2]
    euclideanDistance(fromCoordinate, toCoordinate) {
        return Math.sqrt(Math.pow(fromCoordinate.r - toCoordinate.r, 2) + Math.pow(fromCoordinate.c - toCoordinate.c, 2));
    }

    // Manhattan distance: distance in horizontal and vertical steps taken to goal
    manhattanDistance(fromCoordinate, toCoordinate) {
        return Math.abs(fromCoordinate.r - toCoordinate.r) + Math.abs(fromCoordinate.c - toCoordinate.c);
    }

    // heuristic: Manhattan distance multiplied by 10
    h(fromCoordinate, toCoordinate) {
        // Euclidean needs more calculations than Manhattan, it's also slower, but it's more accurate
        // return Math.floor(this.euclideanDistance(point1, point2) * 10);
        return this.manhattanDistance(fromCoordinate, toCoordinate) * 10;
    }

    // Euclidean distance: distance for adjacent cells, multiplied by 10, either
    // L = 1 * 10 = 10
    // LD = rounded(1.4…) * 10 = 14
    g(fromCoordinate, toCoordinate) {
        return (fromCoordinate.r == toCoordinate.r || fromCoordinate.c == toCoordinate.c) ? A_STAR_MAZE_WALKER_L : A_STAR_MAZE_WALKER_LD;
    }

    // solving has finished, either goal was found or there is no path to goal
    finished() {
        return this.foundGoal || this.noPathToGoal;
    }

    // solve the maze and return the solved path or null if no path was found, max 1000 steps (default)
    solve(maxSteps = 1000) {
        this.reset();
        this.setup();
        while (maxSteps-- > 0 && !this.finished()) this.step();
        return this.path;
    }


    // take a single calculation iteration to solve the maze
    step() {
        if (this.finished()) return;

        this.iterations++;
        this.visualizeStepsTaken();

        this.closed.push(this.current);

        let neighbours = this.possibleNeighboursOf(this.current);

        neighbours.filter(neighbour => !this.open.containsCoordinate(neighbour)).forEach(neighbour => {
            this.open.push(neighbour);
            neighbour.h = this.h(neighbour, this.goal);
            neighbour.g = this.current.g + this.g(neighbour, this.current);
            neighbour.f = neighbour.h + neighbour.g;
            neighbour.parent = this.current;
            neighbour.label = this.getCoordinateLabel(this.current, neighbour);
            this.visualizeOpeningCoordinate(neighbour);
        });

        neighbours.filter(neighbour => this.open.containsCoordinate(neighbour)).map(neighbour => this.open.lookUpCoordinate(neighbour)).forEach(neighbour => {
            // recalculate if shorter path when going through current
            const newG = this.current.g + this.g(neighbour, this.current);
            if (newG < neighbour.g) { // only recalculate if g is shorter
                // h doesn't change
                neighbour.g = newG; // g is calculate above
                neighbour.f = neighbour.h + neighbour.g; // recalculate
                neighbour.parent = this.current; // change parent
                neighbour.label = this.getCoordinateLabel(this.current, neighbour);
                this.visualizeRecalculateOpenCoordinate(neighbour);
            }
        });

        if (this.open.length == 0) {
            this.noPathToGoal = true;
            console.log('no path');
            this.visualizeNoPathToGoal();
            return;
        }

        this.open.sort((a, b) => a.f - b.f || a.h - b.h);
        if (this.current) this.visualizeClosingCurrentCoordinate();
        this.current = this.open.shift();
        if (this.goal.equals(this.current)) {
            this.foundGoal = true;
            this.goal.parent = this.current;
            this.solvedPath = this.buildPath();
            this.debugPath();
            return;
        } else {
            this.visualizeSettingCurrentCoordinate();
        }
    }

    buildPath() {
        if (!this.foundGoal) return;
        let path = new CoordinateArray();
        let pathCoordinate = this.goal;
        while (pathCoordinate != this.start) {
            path.push(pathCoordinate);
            pathCoordinate = pathCoordinate.parent;
        }
        path.push(this.start);
        path.reverse();
        return path.splice(1, path.length - 2); // FIXME why is goal twice included?
    }

    debugPath() {
        if (!this.foundGoal) return;
        this.visualizeDebugPath();
        this.solvedPath.forEach((coordinate, i) => console.log(i + ": " + coordinate.r + "," + coordinate.c));
    }


    visualizeStepsTaken() {
        // override in subclass to visualize
    }

    visualizeOpeningCoordinate(neighbour) {
        // override in subclass to visualize
    }

    visualizeRecalculateOpenCoordinate(neighbour) {
        // override in subclass to visualize
    }

    visualizeNoPathToGoal() {
        // override in subclass to visualize
    }

    visualizeClosingCurrentCoordinate() {
        // override in subclass to visualize
    }

    visualizeSettingCurrentCoordinate() {
        // override in subclass to visualize
    }

    visualizeDebugPath() {
        // override in subclass to visualize
    }
}
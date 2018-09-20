const { getRandomIntInclusive } = require("./utils");

class WorldGrid {
  constructor(width, height) {
    this.worldWidth = width;
    this.worldHeight = height;
    this.cols = Array.from(Array(width));
    this.rows = Array.from(Array(height));
    this.currentWorld  = this._createWorld();
  }

  _createWorld() {
    let world = [];
    this.cols.forEach((_, col) => {
      world[col] = [];
      this.rows.forEach((_, row) => {
        world[col][row] = getRandomIntInclusive(0, 1);
      });
    });
    return world;
  }

  _getNumAliveNeighbors(world, x, y, cols, rows) {
    let numNeighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const col = (x + i + cols) % cols;
        const row = (y + j + rows) % rows;
        const cell = world[col][row];
        if (cell == 1 && !(i == x && j == y)) {
          numNeighbors += 1;
        }
      }
    }
    return numNeighbors;
  }

  _applyWorldRule(currentWorldState, newWorld, neighbors, col, row) {
    if (currentWorldState == 1 && (neighbors < 2 || neighbors > 3)) {
      newWorld[col][row] = 0;
    } else if (currentWorldState == 0 && neighbors == 3) {
      newWorld[col][row] = 1;
    } else {
      newWorld[col][row] = currentWorldState;
    }
  }

  createNewWorld() {
    let newWorld = [];
    this.cols.forEach((_, col) => {
      newWorld[col] = [];
      this.rows.forEach((_, row) => {
        const currentWorldState = this.getCurrentWorld()[col][row];
        const neighbors = this._getNumAliveNeighbors(
          this.getCurrentWorld(),
          col,
          row,
          this.worldWidth,
          this.worldHeight
        );
        this._applyWorldRule(currentWorldState, newWorld, neighbors, col, row);
      });
    });
    this.setCurrentWorld(newWorld);
  }

  getAliveStates() {
    let liveStates = [];
    this.cols.forEach((_, col) => {
      this.rows.forEach((_, row) => {
        const cell = this.getCurrentWorld()[col][row];
        if (cell == 1) {
          liveStates.push({ col, row });
        }
      });
    });
    return liveStates;
  }

  getCurrentWorld() {
    return this.currentWorld;
  }

  setCurrentWorld(word) {
    this.currentWorld = word;
  }
}

module.exports = WorldGrid;

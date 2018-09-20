const assert = require("assert");
const assertS = require("assert").strict;
const WorldGrid = require("../src/world-grid");

const width = 3;
const height = 3;

describe("WorldGrid", function() {
  describe("#_createWorld()", function() {
    it("should return a World 2D array", function() {
      const worldGrid = new WorldGrid(width, height);
      const world = worldGrid._createWorld();
      assert.equal(world.length, width, `The world size is wrong `);
      assert.equal(world[0].length, height, `The world size is wrong `);
    });
  });

  describe("#_getNumAliveNeighbors(world, x, y, cols, rows)", function() {
    it("should return 6 alive Neighbors", function() {
      const worldGrid = new WorldGrid(width, height);
      const worldGridFake = [[1, 1, 0], [1, 0, 1], [1, 1, 1]];
      const neighbors = worldGrid._getNumAliveNeighbors(
        worldGridFake,
        1,
        1,
        3,
        3
      );
      assert.equal(neighbors, 6, `The number of Neighbors is wrong `);
    });
  });

  describe("#createNewWorld()", function() {
    it("should return a new World", function() {
      const worldGrid = new WorldGrid(width, height);
      const firstWorld = worldGrid.getCurrentWorld();
      worldGrid.createNewWorld();
      const newWorld = worldGrid.getCurrentWorld();
      assert.equal(newWorld.length, width, `The world size is wrong `);
      assert.equal(newWorld[0].length, height, `The world size is wrong `);
      assert.notDeepEqual(newWorld, firstWorld, `The new world is not new `);
    });
  });

  describe("#getAliveStates()", function() {
    it("should return a list of alive states ", function() {
      const worldGrid = new WorldGrid(width, height);
      const aliveStates = worldGrid.getAliveStates();
      if (aliveStates.length > 0) {
        assert.ok(true);
      } else {
        assert.fail("The number is alive states shuld be greater than 0");
      }
    });
  });

  describe("#_applyWorldRule(currentWorldState, newWorld, neighbors, col, row)", function() {
    it("should return set alive state to new world ", function() {
      const worldGrid = new WorldGrid(width, height);
      const newWorld = [[0, 1, 0], [1, 0, 1], [1, 1, 1]];
      worldGrid._applyWorldRule(0, newWorld, 3, 0,0);
      assert.equal(newWorld[0][0], 1, `The new world state is wrong `);
    });

    it("should return set dead state to new world ", function() {
      const worldGrid = new WorldGrid(width, height);
      const newWorld = [[1, 1, 0], [1, 0, 1], [1, 1, 1]];
      worldGrid._applyWorldRule(1, newWorld, 4, 0,0);
      assert.equal(newWorld[0][0], 0, `The new world state is wrong `);
    });
  });
});

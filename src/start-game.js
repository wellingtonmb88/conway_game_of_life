const Canvas = require("drawille");
const WorldGrid = require("./world-grid");

const width = (height = 60);
const worldGrid = new WorldGrid(width, height);
const canvas = new Canvas(width, height);

let worldCount = 1;

const drawOnCanvas = states => {
  states.forEach(state => {
    const { col, row } = state;
    canvas.set(col, row);
  });
};

const startGame = () => {
  console.log("\n ----------- New World Nº", worldCount, " ------------\n");
  canvas.clear();
  worldGrid.createNewWorld();
  const liveStates = worldGrid.getAliveStates();
  drawOnCanvas(liveStates);
  process.stdout.write(canvas.frame());
  worldCount++;
};

setInterval(startGame, 10);

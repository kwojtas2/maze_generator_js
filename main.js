let maze;


function setup() {
  createCanvas(401, 401);

  maze = new Maze(20, 20, 20);
}

function draw() {
  background(255);

  //maze.stepGenerate();
  maze.show();
}

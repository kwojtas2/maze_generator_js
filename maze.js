const CellSide = {
  None:  0,
	Up:    1,
	Down:  2,
	Left:  4,
	Right: 8,
  All:   15
}


class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sides = CellSide.All;
    this.visited = false;
  }

  static getIndex(x, y, width, height) {
    if(x < 0 || y < 0 || x > width - 1 || y > height - 1) return -1;
    return x + y * width;
  }

  checkNeighbours(cells, mazeWidth, mazeHeight) {
    let neighbours = [];
    let top   = cells[Cell.getIndex(this.x,     this.y - 1, mazeWidth, mazeHeight)];
    let down  = cells[Cell.getIndex(this.x,     this.y + 1, mazeWidth, mazeHeight)];
    let left  = cells[Cell.getIndex(this.x - 1, this.y,     mazeWidth, mazeHeight)];
    let right = cells[Cell.getIndex(this.x + 1, this.y,     mazeWidth, mazeHeight)];

    if(top   && !top.visited)   neighbours.push(top);
    if(down  && !down.visited)  neighbours.push(down);
    if(left  && !left.visited)  neighbours.push(left);
    if(right && !right.visited) neighbours.push(right);


    if(neighbours.length > 0) {
      let r = floor(random(0, neighbours.length));
      return neighbours[r];
    }
    return null;
  }

  show() {
    let xPos = this.x * this.size;
    let yPos = this.y * this.size;

    if(this.visited) {
      fill(66, 245, 75);
      noStroke();
      rect(xPos, yPos, this.size, this.size);
    } else {
      fill(176, 66, 245);
      strokeWeight(1);
      stroke(0);
      rect(xPos, yPos, this.size, this.size);
    }

    stroke(0);
    strokeWeight(1);
    if(this.sides & CellSide.Up)    line(xPos,             yPos,             xPos + this.size, yPos            );
    if(this.sides & CellSide.Down)  line(xPos,             yPos + this.size, xPos + this.size, yPos + this.size);
    if(this.sides & CellSide.Left)  line(xPos,             yPos,             xPos            , yPos + this.size);
    if(this.sides & CellSide.Right) line(xPos + this.size, yPos,             xPos + this.size, yPos + this.size);
  }
  removeWall(otherCell) {
    if     (this.y == otherCell.y - 1) {
      this.sides &= ~CellSide.Down;
      otherCell.sides &= ~CellSide.Up;
    }
    else if(this.y == otherCell.y + 1) {
      this.sides &= ~CellSide.Up;
      otherCell.sides &= ~CellSide.Down;
    }
    else if(this.x == otherCell.x - 1) {
      this.sides &= ~CellSide.Right;
      otherCell.sides &= ~CellSide.Left
    }
    else if(this.x == otherCell.x + 1) {
      this.sides &= ~CellSide.Left;
      otherCell.sides &= ~CellSide.Right;
    }
  }
}


class Maze {
  constructor(width, height, cellSize) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cells = [];

    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        this.cells.push(new Cell(x, y, cellSize));
      }
    }

    // generation of maze:
    let current = this.cells[0];
    let stack = [];

    while(true) {
      current.visited = true;
      let next = current.checkNeighbours(this.cells, this.width, this.height);
      if(next) {
        next.visited = true;
        stack.push(current);
        current.removeWall(next);
        current = next;
      } else if(stack.length > 0) {
        current = stack.pop();
      } else break;
    }
  }

  stepGenerate() {
    this.current.visited = true;
    let next = this.current.checkNeighbours(this.cells, this.width, this.height);
    if(next) {
      next.visited = true;
      this.stack.push(this.current);
      this.current.removeWall(next);
      this.current = next;
    } else if(this.stack.length > 0) {
      this.current = this.stack.pop();
    }
  }

  show() {
    for (let cell of this.cells) {
      cell.show();
    }
  }
}

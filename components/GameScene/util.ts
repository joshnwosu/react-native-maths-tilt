export type Cell = {
  x: number;
  y: number;
  isWall: boolean; // To differentiate between walls and open paths
};

const directions = [
  { dx: 0, dy: -2 }, // Up
  { dx: 2, dy: 0 }, // Right
  { dx: 0, dy: 2 }, // Down
  { dx: -2, dy: 0 }, // Left
];

// Create an empty grid with all cells marked as walls
export function createGrid(width: number, height: number): Cell[][] {
  const grid: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        x,
        y,
        isWall: true, // Initially mark all cells as walls
      });
    }
    grid.push(row);
  }
  return grid;
}

function isValidCell(x: number, y: number, grid: Cell[][]): boolean {
  return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

// Randomly carve out paths using recursive backtracking
export function generateMaze(
  grid: Cell[][],
  startX: number,
  startY: number
): void {
  const stack: Cell[] = [];
  grid[startY][startX].isWall = false; // Mark the starting cell as a path
  stack.push(grid[startY][startX]);

  while (stack.length > 0) {
    const current = stack.pop() as Cell;

    const neighbors: { cell: Cell; direction: { dx: number; dy: number } }[] =
      [];

    // Check for valid neighbors two cells away to carve paths
    directions.forEach((dir) => {
      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      if (isValidCell(nx, ny, grid) && grid[ny][nx].isWall) {
        neighbors.push({ cell: grid[ny][nx], direction: dir });
      }
    });

    if (neighbors.length > 0) {
      stack.push(current);
      const { cell: next, direction } =
        neighbors[Math.floor(Math.random() * neighbors.length)];

      // Carve the path between the current and the next cell (remove the wall)
      const betweenX = current.x + direction.dx / 2;
      const betweenY = current.y + direction.dy / 2;
      grid[betweenY][betweenX].isWall = false; // Open path

      next.isWall = false; // Mark the next cell as a path
      stack.push(next);
    }
  }
}

export function getMazeRoadBlocks(
  grid: Cell[][],
  blockSize: number
): { x: number; y: number }[] {
  const roadBlocks: { x: number; y: number }[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (!grid[y][x].isWall) {
        roadBlocks.push({
          x: x * blockSize,
          y: y * blockSize,
        });
      }
    }
  }
  return roadBlocks;
}

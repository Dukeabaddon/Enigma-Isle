import { GridPos } from './types';

export const CIPHER_GRID: readonly (readonly string[])[] = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y'],
  ['Z'],
];

export const GRID_COLUMNS: readonly (readonly string[])[] = [
  ['A', 'F', 'K', 'P', 'U', 'Z'],
  ['B', 'G', 'L', 'Q', 'V'],
  ['C', 'H', 'M', 'R', 'W'],
  ['D', 'I', 'N', 'S', 'X'],
  ['E', 'J', 'O', 'T', 'Y'],
];

export function getGridPosition(char: string): GridPos {
  for (let r = 0; r < CIPHER_GRID.length; r++) {
    for (let c = 0; c < CIPHER_GRID[r].length; c++) {
      if (CIPHER_GRID[r][c] === char) {
        return { r, c };
      }
    }
  }
  throw new Error(`Character '${char}' not found on grid`);
}

export function moveUp(char: string): string {
  const { r, c } = getGridPosition(char);
  if (r === 0) {
    // Top row wraps to column bottom
    switch (c) {
      case 0: return 'Z';
      case 1: return 'V';
      case 2: return 'W';
      case 3: return 'X';
      case 4: return 'Y';
    }
  }
  return CIPHER_GRID[r - 1][c];
}

export function moveDown(char: string): string {
  const { r, c } = getGridPosition(char);
  if (char === 'Z') return 'A';
  if (char === 'V') return 'B';
  if (char === 'W') return 'C';
  if (char === 'X') return 'D';
  if (char === 'Y') return 'E';
  return CIPHER_GRID[r + 1][c];
}

export function moveLeft(char: string): string {
  if (char === 'Z') return 'Z';
  const { r, c } = getGridPosition(char);
  const nextCol = (c - 1 + 5) % 5;
  return CIPHER_GRID[r][nextCol];
}

export function moveRight(char: string): string {
  if (char === 'Z') return 'Z';
  const { r, c } = getGridPosition(char);
  const nextCol = (c + 1) % 5;
  return CIPHER_GRID[r][nextCol];
}

/** Step 3 column shift count (encrypt down / decrypt up). */
export const COLUMN_SHIFT = 13;

export function shiftColumnDown13(char: string): string {
  const { c } = getGridPosition(char);
  const col = GRID_COLUMNS[c];
  const idx = col.indexOf(char);
  const nextIdx = (idx + COLUMN_SHIFT) % col.length;
  return col[nextIdx];
}

export function shiftColumnUp13(char: string): string {
  const { c } = getGridPosition(char);
  const col = GRID_COLUMNS[c];
  const idx = col.indexOf(char);
  const step = COLUMN_SHIFT % col.length;
  const nextIdx = (idx - step + col.length) % col.length;
  return col[nextIdx];
}

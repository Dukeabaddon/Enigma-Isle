import { GridPos } from './types';

/** 2×5 island grid for digits 0–9 (row-major). */
export const DIGIT_GRID: readonly (readonly string[])[] = [
  ['0', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9'],
];

export const DIGITS = '0123456789'.split('');

export function isDigit(char: string): boolean {
  return /^[0-9]$/.test(char);
}

export function getDigitGridPosition(digit: string): GridPos {
  for (let r = 0; r < DIGIT_GRID.length; r++) {
    for (let c = 0; c < DIGIT_GRID[r].length; c++) {
      if (DIGIT_GRID[r][c] === digit) {
        return { r, c };
      }
    }
  }
  throw new Error(`Digit '${digit}' not found on grid`);
}

function cellAt(r: number, c: number): string {
  return DIGIT_GRID[r][c];
}

export function digitMoveRight(digit: string): string {
  const { r, c } = getDigitGridPosition(digit);
  const nextCol = (c + 1) % 5;
  return cellAt(r, nextCol);
}

export function digitMoveLeft(digit: string): string {
  const { r, c } = getDigitGridPosition(digit);
  const nextCol = (c - 1 + 5) % 5;
  return cellAt(r, nextCol);
}

export function digitMoveDown(digit: string): string {
  const { r, c } = getDigitGridPosition(digit);
  if (r === DIGIT_GRID.length - 1) {
    return cellAt(0, c);
  }
  return cellAt(r + 1, c);
}

export function digitMoveUp(digit: string): string {
  const { r, c } = getDigitGridPosition(digit);
  if (r === 0) {
    return cellAt(DIGIT_GRID.length - 1, c);
  }
  return cellAt(r - 1, c);
}

export function encryptDigit(char: string): {
  inputChar: string;
  normalizedChar: string;
  step_right: string;
  step_down: string;
  outputChar: string;
} {
  const normalized = char;
  const step_right = digitMoveRight(normalized);
  const step_down = digitMoveDown(step_right);
  return {
    inputChar: char,
    normalizedChar: normalized,
    step_right,
    step_down,
    outputChar: step_down,
  };
}

export function decryptDigit(char: string): {
  inputChar: string;
  step_up: string;
  step_left: string;
  outputChar: string;
} {
  const normalized = char;
  const step_up = digitMoveUp(normalized);
  const step_left = digitMoveLeft(step_up);
  return {
    inputChar: char,
    step_up,
    step_left,
    outputChar: step_left,
  };
}

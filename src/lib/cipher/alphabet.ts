export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function filterLetters(input: string): string {
  return input
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

export function isLetter(char: string): boolean {
  return /^[A-Z]$/.test(char.toUpperCase());
}

export function getLetterValue(char: string): number {
  const index = ALPHABET.indexOf(char);
  if (index === -1) {
    throw new Error(`Invalid letter: ${char}`);
  }
  return index + 1;
}

export function walkRightOnCycle(char: string, steps: number): string {
  const startIdx = ALPHABET.indexOf(char);
  if (startIdx === -1) {
    throw new Error(`Invalid letter: ${char}`);
  }
  const endIdx = ((startIdx + steps) % 26 + 26) % 26;
  return ALPHABET[endIdx];
}

export function inverseWalkRightOnCycle(char: string): string {
  const b = ALPHABET.indexOf(char);
  if (b === -1) {
    throw new Error(`Invalid letter: ${char}`);
  }
  // Inverse of (19a + 18) mod 26 is (11b + 10) mod 26
  const a = ((11 * b + 10) % 26 + 26) % 26;
  return ALPHABET[a];
}

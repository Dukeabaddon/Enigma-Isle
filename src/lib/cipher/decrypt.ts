import { filterLetters, inverseWalkRightOnCycle } from './alphabet';
import { moveDown, moveLeft, moveRight, shiftColumnUp5 } from './grid';
import { DecryptResult, LetterDecryptTrace } from './types';

export function decryptCharacter(char: string): LetterDecryptTrace {
  const normalized = char.toUpperCase();

  // Inverse of Step 4 (finisher): left2 -> down1 -> right1 -> down1
  const left1 = moveLeft(normalized);
  const left2 = moveLeft(left1);
  const down1 = moveDown(left2);
  const right1 = moveRight(down1);
  const down2 = moveDown(right1);

  // Inverse of Step 3: shift up 5x in column
  const step2Letter = shiftColumnUp5(down2);

  // Inverse of Step 1 & 2: inverse cyclic walk
  const step3Letter = inverseWalkRightOnCycle(step2Letter);

  return {
    inputChar: char,
    step1_inverseMoves: {
      left2,
      down1,
      right1,
      down2,
    },
    step1_letter: down2,
    step2_letter: step2Letter,
    step3_letter: step3Letter,
    outputChar: step3Letter,
  };
}

export function decryptText(text: string): DecryptResult {
  const filtered = filterLetters(text);
  const traces: LetterDecryptTrace[] = [];

  for (const char of filtered) {
    traces.push(decryptCharacter(char));
  }

  const resultText = traces.map((t) => t.outputChar).join('');
  return {
    text: resultText,
    traces,
    rawFilteredCount: text.length - filtered.length,
  };
}

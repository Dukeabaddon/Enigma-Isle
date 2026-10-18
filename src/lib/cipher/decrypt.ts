import { inverseWalkRightOnCycle, isLetter } from './alphabet';
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
      left1,
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
  const traces: LetterDecryptTrace[] = [];
  let resultText = '';
  let rawFilteredCount = 0;

  // Letters inverse-map; whitespace kept in place; other chars dropped
  for (const char of text) {
    if (isLetter(char)) {
      const trace = decryptCharacter(char);
      traces.push(trace);
      resultText += trace.outputChar;
    } else if (/\s/.test(char)) {
      resultText += char;
    } else {
      rawFilteredCount += 1;
    }
  }

  return {
    text: resultText,
    traces,
    rawFilteredCount,
  };
}

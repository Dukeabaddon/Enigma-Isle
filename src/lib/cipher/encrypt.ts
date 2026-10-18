import { filterLetters, getLetterValue, walkRightOnCycle } from './alphabet';
import { moveLeft, moveRight, moveUp, shiftColumnDown5 } from './grid';
import { CipherResult, LetterEncryptTrace } from './types';

export function encryptCharacter(char: string): LetterEncryptTrace {
  const normalized = char.toUpperCase();
  const value = getLetterValue(normalized);
  const steps = value * 18;

  // Step 1 + 2: Right-walk on full A-Z cycle
  const step2Letter = walkRightOnCycle(normalized, steps);

  // Step 3: Shift down 5x in column
  const step3Letter = shiftColumnDown5(step2Letter);

  // Step 4: up1 -> left1 -> up1 -> right2
  const up1 = moveUp(step3Letter);
  const left1 = moveLeft(up1);
  const up2 = moveUp(left1);
  const right1 = moveRight(up2);
  const right2 = moveRight(right1);

  return {
    inputChar: char,
    normalizedChar: normalized,
    step1_value: value,
    step2_count: steps,
    step2_letter: step2Letter,
    step3_letter: step3Letter,
    step4_moves: {
      up1,
      left1,
      up2,
      right2,
    },
    outputChar: right2,
  };
}

export function encryptText(text: string): CipherResult {
  const filtered = filterLetters(text);
  const traces: LetterEncryptTrace[] = [];

  for (const char of filtered) {
    traces.push(encryptCharacter(char));
  }

  const resultText = traces.map((t) => t.outputChar).join('');
  return {
    text: resultText,
    traces,
    rawFilteredCount: text.length - filtered.length,
  };
}

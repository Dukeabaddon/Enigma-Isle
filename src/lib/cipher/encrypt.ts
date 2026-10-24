import { getLetterValue, isLetter, walkRightOnCycle } from './alphabet';
import { encryptDigit, isDigit } from './digits';
import { moveLeft, moveRight, moveUp, shiftColumnDown13 } from './grid';
import { CipherResult, EncryptTrace, LetterEncryptTrace } from './types';

export function encryptCharacter(char: string): LetterEncryptTrace {
  const normalized = char.toUpperCase();
  const value = getLetterValue(normalized);
  const steps = value * 18;

  // Step 1 + 2: Right-walk on full A-Z cycle
  const step2Letter = walkRightOnCycle(normalized, steps);

  // Step 3: Shift down 13× in column (mod column length)
  const step3Letter = shiftColumnDown13(step2Letter);

  // Step 4: up1 -> left1 -> up1 -> right2
  const up1 = moveUp(step3Letter);
  const left1 = moveLeft(up1);
  const up2 = moveUp(left1);
  const right1 = moveRight(up2);
  const right2 = moveRight(right1);

  return {
    kind: 'letter',
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
      right1,
      right2,
    },
    outputChar: right2,
  };
}

export function encryptText(text: string): CipherResult {
  const traces: EncryptTrace[] = [];
  let resultText = '';
  let rawFilteredCount = 0;

  for (const char of text) {
    if (isLetter(char)) {
      const trace = encryptCharacter(char);
      traces.push(trace);
      resultText += trace.outputChar;
    } else if (isDigit(char)) {
      const trace = { kind: 'digit' as const, ...encryptDigit(char) };
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

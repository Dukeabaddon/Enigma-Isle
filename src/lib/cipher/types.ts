export interface LetterEncryptTrace {
  kind: 'letter';
  inputChar: string;
  normalizedChar: string;
  step1_value: number;
  step2_count: number;
  step2_letter: string;
  step3_letter: string;
  step4_moves: {
    up1: string;
    left1: string;
    up2: string;
    right1: string;
    right2: string;
  };
  outputChar: string;
}

export interface DigitEncryptTrace {
  kind: 'digit';
  inputChar: string;
  normalizedChar: string;
  step_right: string;
  step_down: string;
  outputChar: string;
}

export interface DigitDecryptTrace {
  kind: 'digit';
  inputChar: string;
  step_up: string;
  step_left: string;
  outputChar: string;
}

export type EncryptTrace = LetterEncryptTrace | DigitEncryptTrace;
export type DecryptTrace = LetterDecryptTrace | DigitDecryptTrace;

export interface LetterDecryptTrace {
  kind: 'letter';
  inputChar: string;
  step1_inverseMoves: {
    left1: string;
    left2: string;
    down1: string;
    right1: string;
    down2: string;
  };
  step1_letter: string;
  step2_letter: string;
  step3_letter: string;
  outputChar: string;
}

export interface CipherResult {
  text: string;
  traces: EncryptTrace[];
  rawFilteredCount: number;
}

export interface DecryptResult {
  text: string;
  traces: DecryptTrace[];
  rawFilteredCount: number;
}

export interface GridPos {
  r: number;
  c: number;
}

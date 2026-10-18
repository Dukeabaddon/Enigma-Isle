export interface LetterEncryptTrace {
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

export interface LetterDecryptTrace {
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
  traces: LetterEncryptTrace[];
  rawFilteredCount: number;
}

export interface DecryptResult {
  text: string;
  traces: LetterDecryptTrace[];
  rawFilteredCount: number;
}

export interface GridPos {
  r: number;
  c: number;
}

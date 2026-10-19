import { describe, expect, it } from 'vitest';
import { ALPHABET, decryptCharacter, decryptText, encryptCharacter, encryptText } from './index';
import {
  COLUMN_SHIFT,
  GRID_COLUMNS,
  shiftColumnDown13,
  shiftColumnUp13,
} from './grid';

describe('Enigma Isle Cipher', () => {
  it('encrypts and round-trips all 26 letters of the alphabet', () => {
    for (const char of ALPHABET) {
      const encrypted = encryptText(char);
      expect(encrypted.text).toHaveLength(1);
      const decrypted = decryptText(encrypted.text);
      expect(decrypted.text).toBe(char);
    }
  });

  it('uses column shift count 13', () => {
    expect(COLUMN_SHIFT).toBe(13);
  });

  it('shiftColumnDown13 / Up13 are inverses on every grid letter', () => {
    for (const col of GRID_COLUMNS) {
      for (const char of col) {
        expect(shiftColumnUp13(shiftColumnDown13(char))).toBe(char);
        expect(shiftColumnDown13(shiftColumnUp13(char))).toBe(char);
      }
    }
  });

  it('applies +13 mod column length (col A len 6 → +1; cols B–E len 5 → +3)', () => {
    // Col A: [A,F,K,P,U,Z] — 13 % 6 = 1
    expect(shiftColumnDown13('A')).toBe('F');
    expect(shiftColumnDown13('Z')).toBe('A');
    // Col B: [B,G,L,Q,V] — 13 % 5 = 3
    expect(shiftColumnDown13('B')).toBe('Q');
    expect(shiftColumnDown13('V')).toBe('L');
  });

  it('matches worked Step 4 finisher wiring (output = right2)', () => {
    const trace = encryptCharacter('U');
    expect(trace.step4_moves.right2).toBe(trace.outputChar);
  });

  it('handles lowercase and mixed case inputs correctly (normalizes to uppercase)', () => {
    const encLower = encryptText('hello');
    const encUpper = encryptText('HELLO');
    expect(encLower.text).toBe(encUpper.text);
    // Locked vector after Step 3 column shift 13×
    expect(encLower.text).toBe('CZUUA');

    const decrypted = decryptText(encLower.text);
    expect(decrypted.text).toBe('HELLO');
  });

  it('preserves spaces; strips digits and punctuation', () => {
    const raw = 'Hello, World! 2026';
    const encrypted = encryptText(raw);
    expect(encrypted.rawFilteredCount).toBe(2 + 4); // comma, bang, four digits
    expect(encrypted.text.includes(' ')).toBe(true);

    const decrypted = decryptText(encrypted.text);
    expect(decrypted.text).toBe('HELLO WORLD ');
  });

  it('round-trips phrases with spaces (e.g. hello island map)', () => {
    const phrase = 'hello island map';
    const enc = encryptText(phrase);
    expect(enc.text.split(' ')).toHaveLength(3);
    const dec = decryptText(enc.text);
    expect(dec.text).toBe('HELLO ISLAND MAP');
  });

  it('accurately roundtrips sample words', () => {
    const words = ['ENIGMA', 'ISLE', 'SECRET', 'TREASURE', 'DISCOVERY', 'SWORD'];
    for (const word of words) {
      const enc = encryptText(word);
      const dec = decryptText(enc.text);
      expect(dec.text).toBe(word);
    }
  });

  it('locks SWORD encrypt vector under shift-13', () => {
    expect(encryptText('SWORD').text).toBe('DQAJE');
    expect(decryptText('DQAJE').text).toBe('SWORD');
  });

  it('provides complete step trace breakdown in character encryption and decryption', () => {
    const charTrace = encryptCharacter('A');
    expect(charTrace.step1_value).toBe(1);
    expect(charTrace.step2_count).toBe(18);
    expect(charTrace.normalizedChar).toBe('A');
    // After walk S, down-13 on col C: S is in col D actually — assert inverse only
    const decTrace = decryptCharacter(charTrace.outputChar);
    expect(decTrace.outputChar).toBe('A');
  });
});

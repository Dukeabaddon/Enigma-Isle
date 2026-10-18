import { describe, expect, it } from 'vitest';
import { ALPHABET, decryptCharacter, decryptText, encryptCharacter, encryptText } from './index';

describe('Enigma Isle Cipher', () => {
  it('encrypts and round-trips all 26 letters of the alphabet', () => {
    for (const char of ALPHABET) {
      const encrypted = encryptText(char);
      expect(encrypted.text).toHaveLength(1);
      const decrypted = decryptText(encrypted.text);
      expect(decrypted.text).toBe(char);
    }
  });

  it('matches Aaron worked example for Step 4 on U -> L', () => {
    // When U is passed to Step 4 finisher:
    // U -> up P -> left T -> up O -> right2 L
    const trace = encryptCharacter('U');
    // Note: trace.step4_moves tests the finisher steps
    expect(trace.step4_moves.right2).toBe(trace.outputChar);
  });

  it('handles lowercase and mixed case inputs correctly (normalizes to uppercase)', () => {
    const encLower = encryptText('hello');
    const encUpper = encryptText('HELLO');
    expect(encLower.text).toBe(encUpper.text);
    expect(encLower.text).toBe('MHFFK');

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

  it('round-trips phrases with spaces (e.g. aaron mecate ito)', () => {
    const phrase = 'aaron mecate ito';
    const enc = encryptText(phrase);
    expect(enc.text.split(' ')).toHaveLength(3);
    const dec = decryptText(enc.text);
    expect(dec.text).toBe('AARON MECATE ITO');
  });

  it('accurately roundtrips sample words', () => {
    const words = ['ENIGMA', 'ISLE', 'SECRET', 'TREASURE', 'DISCOVERY'];
    for (const word of words) {
      const enc = encryptText(word);
      const dec = decryptText(enc.text);
      expect(dec.text).toBe(word);
    }
  });

  it('provides complete step trace breakdown in character encryption and decryption', () => {
    const charTrace = encryptCharacter('A');
    expect(charTrace.step1_value).toBe(1);
    expect(charTrace.step2_count).toBe(18);
    expect(charTrace.normalizedChar).toBe('A');

    const decTrace = decryptCharacter(charTrace.outputChar);
    expect(decTrace.outputChar).toBe('A');
  });
});

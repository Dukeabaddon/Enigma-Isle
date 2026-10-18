import { useState, useCallback } from 'react';
import { encryptText, decryptText, CipherResult, DecryptResult } from '@/lib/cipher';

export type CipherMode = 'idle' | 'encrypt' | 'decrypt';

export interface UseCipherReturn {
  inputText: string;
  setInputText: (val: string) => void;
  mode: CipherMode;
  encryptResult: CipherResult | null;
  decryptResult: DecryptResult | null;
  error: string | null;
  handleEncrypt: () => void;
  handleDecrypt: () => void;
  reset: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export function useCipher(): UseCipherReturn {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<CipherMode>('idle');
  const [encryptResult, setEncryptResult] = useState<CipherResult | null>(null);
  const [decryptResult, setDecryptResult] = useState<DecryptResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEncrypt = useCallback(() => {
    if (!inputText.trim()) {
      setError('Please enter a message to encrypt');
      return;
    }
    setError(null);
    const result = encryptText(inputText);
    if (!result.text) {
      setError('Message must contain at least one letter (A-Z)');
      return;
    }
    setEncryptResult(result);
    setDecryptResult(null);
    setMode('encrypt');
    setIsExpanded(true);
  }, [inputText]);

  const handleDecrypt = useCallback(() => {
    if (!inputText.trim()) {
      setError('Please enter ciphertext to decrypt');
      return;
    }
    setError(null);
    const result = decryptText(inputText);
    if (!result.text) {
      setError('Ciphertext must contain at least one letter (A-Z)');
      return;
    }
    setDecryptResult(result);
    setEncryptResult(null);
    setMode('decrypt');
    setIsExpanded(true);
  }, [inputText]);

  const reset = useCallback(() => {
    setInputText('');
    setMode('idle');
    setEncryptResult(null);
    setDecryptResult(null);
    setError(null);
    setIsExpanded(false);
  }, []);

  return {
    inputText,
    setInputText,
    mode,
    encryptResult,
    decryptResult,
    error,
    handleEncrypt,
    handleDecrypt,
    reset,
    isExpanded,
    setIsExpanded,
  };
}

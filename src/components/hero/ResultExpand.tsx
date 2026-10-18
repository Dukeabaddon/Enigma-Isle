import { useState } from 'react';
import { Copy, Check, Eye } from 'lucide-react';
import { CipherResult, DecryptResult } from '@/lib/cipher';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultExpandProps {
  isExpanded: boolean;
  mode: 'encrypt' | 'decrypt';
  encryptResult: CipherResult | null;
  decryptResult: DecryptResult | null;
  onOpenSteps: () => void;
  onReset: () => void;
}

const SEAM = '#342319';

export default function ResultExpand({
  isExpanded,
  mode,
  encryptResult,
  decryptResult,
  onOpenSteps,
}: ResultExpandProps) {
  const [copied, setCopied] = useState(false);

  const activeResult = mode === 'encrypt' ? encryptResult?.text : decryptResult?.text;

  const handleCopy = () => {
    if (!activeResult) return;
    navigator.clipboard.writeText(activeResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isExpanded && activeResult && (
        <motion.section
          id="cipher-result-section"
          aria-label="Cipher result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16 overflow-hidden"
          style={{ backgroundColor: SEAM }}
        >
          {/* Tall dirt strata — repeat vertically; SEAM fade kills white/black top cut */}
          <div
            className="absolute inset-0 pointer-events-none select-none"
            style={{
              backgroundColor: SEAM,
              backgroundImage: `linear-gradient(to bottom, ${SEAM} 0%, ${SEAM} 12px, transparent 56px), url('/images/hero-dirt.webp')`,
              backgroundSize: '100% 56px, 100% auto',
              backgroundPosition: 'top center, top center',
              backgroundRepeat: 'no-repeat, repeat-y',
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: 'rgba(52, 35, 25, 0.28)' }}
            aria-hidden
          />

          <div className="relative z-10 max-w-2xl mx-auto w-full">
            <div
              id="cipher-result"
              className="relative parchment-paper p-6 sm:p-8 bg-[#FFFDF7] text-ink shadow-2xl"
            >
              <div className="flex flex-col items-center justify-center text-center gap-3 pb-5 border-b border-ink/10">
                <div className="space-y-1.5 w-full">
                  <h3 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-wider text-[#B8860B] block text-center">
                    {mode === 'encrypt' ? 'Ciphertext Result (Upper A–Z)' : 'Decrypted Plaintext'}
                  </h3>
                  <div className="font-mono text-2xl sm:text-4xl font-black tracking-[0.25em] sm:tracking-[0.3em] text-ink break-all select-all text-center">
                    {activeResult}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-ink text-white font-bold text-xs hover:bg-ink/80 transition-all shadow-md active:scale-95 min-h-[44px]"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#D4A017]" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Result'}
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={onOpenSteps}
                  className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-[#B8860B] transition-colors min-h-[44px]"
                >
                  <Eye className="w-4 h-4 text-ink" />
                  {mode === 'encrypt' ? 'View Step-by-Step Breakdown' : 'View Inverse Breakdown'}
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

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

/** Section fill under strata: #35231b → #33231a */
const BG_TOP = '#35231b';
const BG_BOTTOM = '#33231a';
const DIRT_H = 280;

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
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-[5] w-full overflow-x-hidden overflow-y-visible scroll-mt-20"
          style={{
            background: `linear-gradient(to bottom, ${BG_TOP} 0%, ${BG_BOTTOM} 100%)`,
          }}
        >
          {/* Strata IMAGE only — top:-35px into hero grass (not section margin) */}
          <div
            className="absolute inset-x-0 w-full pointer-events-none select-none z-[1]"
            style={{
              top: -35,
              height: DIRT_H + 35,
              backgroundImage: `url('/images/strata.jpeg')`,
              backgroundSize: `auto ${DIRT_H}px`,
              backgroundPosition: 'center top',
              backgroundRepeat: 'repeat-x',
            }}
            aria-hidden
          />
          {/* Exact color lip — grass join */}
          <div
            className="absolute inset-x-0 h-3 pointer-events-none z-[2]"
            style={{ top: -35, backgroundColor: BG_TOP }}
            aria-hidden
          />
          {/* Top join veil — #35231b → transparent over strata */}
          <div
            className="absolute inset-x-0 h-20 sm:h-24 pointer-events-none z-[2]"
            style={{
              top: -35,
              background: `linear-gradient(to bottom, ${BG_TOP} 0%, transparent 100%)`,
            }}
            aria-hidden
          />
          {/* Soft falloff under strata into #35231b → #33231a */}
          <div
            className="absolute inset-x-0 pointer-events-none z-[1]"
            style={{
              top: DIRT_H - 48 - 35,
              height: 80,
              background: `linear-gradient(to bottom, transparent 0%, ${BG_TOP} 45%, ${BG_BOTTOM} 100%)`,
            }}
            aria-hidden
          />

          {/* Parchment low — clear air under strata */}
          <div className="relative z-10 min-h-[110dvh] flex flex-col justify-end px-4 sm:px-6 pt-[calc(280px+6rem)] pb-20 sm:pb-28">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              <div
                id="cipher-result"
                className="relative parchment-paper p-6 sm:p-8 bg-[#FFFDF7] text-ink shadow-2xl translate-y-[100px] mb-[100px]"
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
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

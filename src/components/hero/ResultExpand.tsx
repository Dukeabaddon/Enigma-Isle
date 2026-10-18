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

  const SEAM = '#3c2820';

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
          className="relative w-full overflow-hidden scroll-mt-20"
          style={{ backgroundColor: SEAM }}
        >
          {/* Dirt strata — appears cleanly below the Section 1 wave cut */}
          <div
            className="w-full bg-repeat-x py-12 sm:py-16 px-4 sm:px-6 relative flex flex-col justify-center"
            style={{
              backgroundImage: `url('/images/hero-dirt.webp'), radial-gradient(circle at 20% 80%, rgba(90,60,45,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 90%, rgba(70,45,30,0.5) 0%, transparent 45%)`,
              backgroundSize: 'auto 260px, 100% 100%, 100% 100%',
              backgroundPosition: 'top center, center, center',
              backgroundColor: SEAM,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: 'rgba(60, 40, 32, 0.35)' }}
            />

            <div className="relative z-10 max-w-2xl mx-auto w-full space-y-4">
              <div id="cipher-result" className="relative parchment-paper p-6 sm:p-8 bg-[#FFFDF7] text-ink shadow-2xl">
                {/* Result header (Moat d8683416: centered font-display subheading) */}
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

                {/* Actions footer */}
                <div className="mt-4 pt-3 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={onOpenSteps}
                    className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-[#B8860B] transition-colors min-h-[44px]"
                  >
                    {/* Task 26: Eye icon is black/ink */}
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

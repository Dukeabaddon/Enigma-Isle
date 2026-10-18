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

  return (
    <AnimatePresence>
      {isExpanded && activeResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden bg-[#3E2A22]"
        >
          {/* Underground Dirt Strata Background Layer — Perfectly seamless with Section 2 #3E2A22 */}
          <div
            className="w-full bg-[#3E2A22] bg-repeat-x py-16 sm:py-24 px-4 sm:px-6 relative min-h-[100dvh] flex flex-col justify-center"
            style={{
              backgroundImage: `url('/images/hero-dirt.webp'), radial-gradient(circle at 20% 80%, rgba(90,60,45,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 90%, rgba(70,45,30,0.5) 0%, transparent 45%)`,
              backgroundSize: 'auto 280px, 100% 100%, 100% 100%',
              backgroundColor: '#3E2A22',
            }}
          >
            {/* Sediment rocks & strata overlay */}
            <div className="absolute inset-0 bg-[#3E2A22]/50 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto w-full space-y-4">
              {/* Parchment Paper Card */}
              <div className="relative parchment-paper p-6 sm:p-8 bg-[#FFFDF7] text-ink shadow-2xl">
                {/* Result header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink/10">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#B8860B] block">
                      {mode === 'encrypt' ? 'Ciphertext Result (Upper A–Z)' : 'Decrypted Plaintext'}
                    </span>
                    <div className="font-mono text-2xl sm:text-3xl font-black tracking-[0.25em] sm:tracking-[0.3em] text-ink break-all select-all">
                      {activeResult}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-ink text-white font-bold text-xs hover:bg-ink/80 transition-all shadow-md active:scale-95 min-h-[44px]"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#D4A017]" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

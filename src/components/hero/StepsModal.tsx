import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { X, ArrowRight, CornerDownRight } from 'lucide-react';
import { LetterEncryptTrace, LetterDecryptTrace } from '@/lib/cipher';

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'encrypt' | 'decrypt';
  encryptTraces?: LetterEncryptTrace[];
  decryptTraces?: LetterDecryptTrace[];
}

/**
 * Step-by-step modal styled after Old parchment v.2.2
 * (feTurbulence + feDisplacementMap on a separate absolute sheet;
 * content sits on top unfiltered for readability).
 * Ref: https://www.codewithrandom.com/2023/10/24/css-paper-effect/
 */
export default function StepsModal({
  isOpen,
  onClose,
  mode,
  encryptTraces = [],
  decryptTraces = [],
}: StepsModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const containRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const syncHeight = () => {
      const sheet = sheetRef.current;
      const contain = containRef.current;
      if (!sheet || !contain) return;
      sheet.style.height = `${contain.offsetHeight}px`;
    };

    syncHeight();
    const ro = new ResizeObserver(syncHeight);
    if (containRef.current) ro.observe(containRef.current);
    window.addEventListener('resize', syncHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, [isOpen, selectedIdx, mode, encryptTraces.length, decryptTraces.length]);

  if (!isOpen) return null;

  const totalChars = mode === 'encrypt' ? encryptTraces.length : decryptTraces.length;
  const currentEncryptTrace = mode === 'encrypt' ? encryptTraces[selectedIdx] : null;
  const currentDecryptTrace = mode === 'decrypt' ? decryptTraces[selectedIdx] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2a1810]/65 backdrop-blur-[2px] animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="steps-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* SVG filter — Old parchment v.2.2 wavy edges */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="16" />
        </filter>
      </svg>

      <div className="relative w-full max-w-2xl max-h-[92vh]">
        {/* Absolute parchment sheet (filtered) — height synced to content */}
        <div ref={sheetRef} className="old-parchment-sheet" aria-hidden="true" />

        {/* Sharp readable content (not filtered) */}
        <div
          ref={containRef}
          className="old-parchment-content flex max-h-[92vh] flex-col overflow-hidden px-5 py-6 sm:px-8 sm:py-8"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                id="steps-modal-title"
                className="font-display text-xl font-bold tracking-tight text-[#3d220f] sm:text-2xl"
              >
                {mode === 'encrypt' ? 'Encryption path' : 'Decryption path'}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[#7a4a22]/90 font-sans">
                Letter path through each cipher layer
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-[#5c3310] hover:bg-[#5c3310]/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Letter selector */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 font-sans">
            <span className="mr-1 shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#7a4a22]">
              Letter
            </span>
            {Array.from({ length: totalChars }).map((_, idx) => {
              const letter =
                mode === 'encrypt'
                  ? encryptTraces[idx]?.normalizedChar
                  : decryptTraces[idx]?.inputChar;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all ${
                    isSelected
                      ? mode === 'encrypt'
                        ? 'bg-encrypt text-white shadow-md'
                        : 'bg-decrypt text-white shadow-md'
                      : 'bg-[#fffef0]/80 text-[#3d220f] ring-1 ring-[#5c3310]/20 hover:ring-[#5c3310]/40'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1 font-sans text-[15px] leading-relaxed text-[#4a2c14]">
            {mode === 'encrypt' && currentEncryptTrace && (
              <>
                <StepCard accent="encrypt" title="Steps 1–2 · Value & right walk">
                  <p>
                    <strong>{currentEncryptTrace.normalizedChar}</strong> = #
                    {currentEncryptTrace.step1_value}. ×18 → walk{' '}
                    <strong>{currentEncryptTrace.step2_count}</strong> steps right on A–Z cycle.
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentEncryptTrace.normalizedChar}</span>
                    <ArrowRight className="h-4 w-4 text-encrypt" />
                    <span className="text-xs text-[#7a4a22]">+{currentEncryptTrace.step2_count}</span>
                    <ArrowRight className="h-4 w-4 text-encrypt" />
                    <span className="font-bold text-encrypt-deep">{currentEncryptTrace.step2_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="neutral" title="Step 3 · Column down 5×">
                  <p>
                    From <strong>{currentEncryptTrace.step2_letter}</strong>, shift down 5 in its
                    column.
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentEncryptTrace.step2_letter}</span>
                    <CornerDownRight className="h-4 w-4 text-[#7a4a22]" />
                    <span className="text-xs text-[#7a4a22]">down 5</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-bold">{currentEncryptTrace.step3_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="encrypt" title="Step 4 · Finisher path">
                  <p>Up 1 → left 1 → up 1 → right 2 on the grid.</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MiniCell label="Up 1" value={currentEncryptTrace.step4_moves.up1} />
                    <MiniCell label="Left 1" value={currentEncryptTrace.step4_moves.left1} />
                    <MiniCell label="Up 1" value={currentEncryptTrace.step4_moves.up2} />
                    <MiniCell
                      label="Right 2"
                      value={currentEncryptTrace.outputChar}
                      highlight="encrypt"
                    />
                  </div>
                </StepCard>
              </>
            )}

            {mode === 'decrypt' && currentDecryptTrace && (
              <>
                <StepCard accent="decrypt" title="Decrypt 1 · Inverse finisher">
                  <p>
                    Reverse path from <strong>{currentDecryptTrace.inputChar}</strong>: left 2 →
                    down 1 → right 1 → down 1.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MiniCell label="Left 2" value={currentDecryptTrace.step1_inverseMoves.left2} />
                    <MiniCell label="Down 1" value={currentDecryptTrace.step1_inverseMoves.down1} />
                    <MiniCell label="Right 1" value={currentDecryptTrace.step1_inverseMoves.right1} />
                    <MiniCell
                      label="Down 1"
                      value={currentDecryptTrace.step1_letter}
                      highlight="decrypt"
                    />
                  </div>
                </StepCard>

                <StepCard accent="neutral" title="Decrypt 2 · Column up 5×">
                  <p>
                    From <strong>{currentDecryptTrace.step1_letter}</strong>, shift up 5 in column.
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentDecryptTrace.step1_letter}</span>
                    <ArrowRight className="h-4 w-4 text-[#7a4a22]" />
                    <span className="text-xs text-[#7a4a22]">up 5</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-bold">{currentDecryptTrace.step2_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="decrypt" title="Decrypt 3 · Inverse cycle walk">
                  <p>Modular inverse walk recovers plaintext.</p>
                  <MonoRow>
                    <span className="font-bold">{currentDecryptTrace.step2_letter}</span>
                    <ArrowRight className="h-4 w-4 text-decrypt" />
                    <span className="text-xs text-[#7a4a22]">inverse</span>
                    <ArrowRight className="h-4 w-4 text-decrypt" />
                    <span className="font-bold text-decrypt-deep">
                      {currentDecryptTrace.outputChar}
                    </span>
                  </MonoRow>
                </StepCard>
              </>
            )}
          </div>

          <div className="mt-5 flex justify-end border-t border-[#5c3310]/15 pt-4 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl bg-[#3d220f] px-6 text-sm font-semibold text-[#fffef0] hover:bg-[#2a1810] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  title,
  children,
  accent,
}: {
  title: string;
  children: ReactNode;
  accent: 'encrypt' | 'decrypt' | 'neutral';
}) {
  const border =
    accent === 'encrypt'
      ? 'border-encrypt/35 bg-[#fff8e8]/75'
      : accent === 'decrypt'
        ? 'border-decrypt/35 bg-[#eef6f1]/75'
        : 'border-[#5c3310]/15 bg-[#fffef0]/70';

  return (
    <div className={`space-y-2 rounded-xl border p-3.5 shadow-sm ${border}`}>
      <div className="text-[11px] font-bold uppercase tracking-wider text-[#5c3310]">{title}</div>
      <div className="space-y-2 text-sm leading-relaxed text-[#4a2c14]">{children}</div>
    </div>
  );
}

function MonoRow({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-[#5c3310]/12 bg-[#fffef0]/95 px-3 py-2 font-mono text-sm">
      {children}
    </div>
  );
}

function MiniCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: 'encrypt' | 'decrypt';
}) {
  const hi =
    highlight === 'encrypt'
      ? 'border-encrypt/50 bg-encrypt/15'
      : highlight === 'decrypt'
        ? 'border-decrypt/50 bg-decrypt/15'
        : 'border-[#5c3310]/12 bg-[#fffef0]/95';

  return (
    <div className={`rounded-lg border p-2 text-center font-mono ${hi}`}>
      <div className="text-[10px] text-[#7a4a22]">{label}</div>
      <div className="text-sm font-bold text-[#3d220f]">{value}</div>
    </div>
  );
}

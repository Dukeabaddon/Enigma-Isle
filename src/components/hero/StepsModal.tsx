import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { X, ArrowRight, CornerDownRight } from 'lucide-react';
import {
  CIPHER_GRID,
  DIGIT_GRID,
  DecryptTrace,
  EncryptTrace,
} from '@/lib/cipher';

interface StepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'encrypt' | 'decrypt';
  encryptTraces?: EncryptTrace[];
  decryptTraces?: DecryptTrace[];
}

function traceChipLabel(trace: EncryptTrace | DecryptTrace, mode: 'encrypt' | 'decrypt'): string {
  if (mode === 'encrypt') {
    return (trace as EncryptTrace).normalizedChar;
  }
  return trace.inputChar;
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
  const currentEncryptTrace: EncryptTrace | null =
    mode === 'encrypt' ? encryptTraces[selectedIdx] ?? null : null;
  const currentDecryptTrace: DecryptTrace | null =
    mode === 'decrypt' ? decryptTraces[selectedIdx] ?? null : null;
  const currentLetterEncrypt =
    currentEncryptTrace?.kind === 'letter' ? currentEncryptTrace : null;
  const currentDigitEncrypt =
    currentEncryptTrace?.kind === 'digit' ? currentEncryptTrace : null;
  const currentLetterDecrypt =
    currentDecryptTrace?.kind === 'letter' ? currentDecryptTrace : null;
  const currentDigitDecrypt =
    currentDecryptTrace?.kind === 'digit' ? currentDecryptTrace : null;

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
          className="old-parchment-content flex max-h-[92vh] min-h-0 flex-col px-5 py-6 sm:px-8 sm:py-8"
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
                Cipher path per symbol — letters use four layers; digits use the 2×5 grid.
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

          <div className="mb-4 flex shrink-0 items-center gap-2 overflow-x-auto overflow-y-visible py-2 font-sans">
            <span className="mr-1 shrink-0 text-[11px] font-bold uppercase tracking-wider text-[#7a4a22]">
              Symbol
            </span>
            {Array.from({ length: totalChars }).map((_, idx) => {
              const trace = mode === 'encrypt' ? encryptTraces[idx] : decryptTraces[idx];
              const letter = trace ? traceChipLabel(trace, mode) : '?';
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold transition-colors ${
                    isSelected
                      ? mode === 'encrypt'
                        ? 'border-[#B8860B] bg-encrypt text-white'
                        : 'border-[#1F6B4F] bg-decrypt text-white'
                      : 'border-[#5c3310]/25 bg-[#fffef0]/80 text-[#3d220f] hover:border-[#5c3310]/45'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1 font-sans text-[15px] leading-relaxed text-[#4a2c14]">
            {mode === 'encrypt' && currentDigitEncrypt && (
              <StepCard accent="encrypt" title="Digit · Right 1 → Down 1">
                <p>
                  On the 2×5 number grid, move <strong>right</strong> once (wrap at row end), then{' '}
                  <strong>down</strong> once (wrap from bottom to top).
                </p>
                <MonoRow>
                  <span className="font-bold">{currentDigitEncrypt.normalizedChar}</span>
                  <ArrowRight className="h-4 w-4 text-encrypt" />
                  <span className="font-bold">{currentDigitEncrypt.step_right}</span>
                  <CornerDownRight className="h-4 w-4 text-encrypt" />
                  <span className="font-bold text-encrypt-deep">{currentDigitEncrypt.outputChar}</span>
                </MonoRow>
                <NumberGridTraversal
                  accent="encrypt"
                  path={[
                    currentDigitEncrypt.normalizedChar,
                    currentDigitEncrypt.step_right,
                    currentDigitEncrypt.outputChar,
                  ]}
                  labels={['Start', 'Right 1', 'Down 1 (Cipher)']}
                />
              </StepCard>
            )}

            {mode === 'encrypt' && currentLetterEncrypt && (
              <>
                <StepCard accent="encrypt" title="Steps 1–2 · Value & right walk">
                  <p>
                    <strong>{currentLetterEncrypt.normalizedChar}</strong> = #
                    {currentLetterEncrypt.step1_value}. ×18 → walk{' '}
                    <strong>{currentLetterEncrypt.step2_count}</strong> steps right on A–Z cycle.
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentLetterEncrypt.normalizedChar}</span>
                    <ArrowRight className="h-4 w-4 text-encrypt" />
                    <span className="text-xs text-[#7a4a22]">+{currentLetterEncrypt.step2_count}</span>
                    <ArrowRight className="h-4 w-4 text-encrypt" />
                    <span className="font-bold text-encrypt-deep">{currentLetterEncrypt.step2_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="neutral" title="Step 3 · Column down 13×">
                  <p>
                    From <strong>{currentLetterEncrypt.step2_letter}</strong>, shift down 13 in its
                    column (mod column length).
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentLetterEncrypt.step2_letter}</span>
                    <CornerDownRight className="h-4 w-4 text-[#7a4a22]" />
                    <span className="text-xs text-[#7a4a22]">down 13</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-bold">{currentLetterEncrypt.step3_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="encrypt" title="Step 4 · Finisher path">
                  <p>Up 1 → left 1 → up 1 → right 2 on the letter grid.</p>
                  <GridTraversalAnimation
                    accent="encrypt"
                    path={[
                      currentLetterEncrypt.step3_letter,
                      currentLetterEncrypt.step4_moves.up1,
                      currentLetterEncrypt.step4_moves.left1,
                      currentLetterEncrypt.step4_moves.up2,
                      currentLetterEncrypt.step4_moves.right1,
                      currentLetterEncrypt.outputChar,
                    ]}
                    labels={['Start', 'Up 1', 'Left 1', 'Up 1', 'Right 1', 'Right 2 (Cipher)']}
                  />
                  <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    <MiniCell label="Up 1" value={currentLetterEncrypt.step4_moves.up1} />
                    <MiniCell label="Left 1" value={currentLetterEncrypt.step4_moves.left1} />
                    <MiniCell label="Up 1" value={currentLetterEncrypt.step4_moves.up2} />
                    <MiniCell label="Right 1" value={currentLetterEncrypt.step4_moves.right1} />
                    <MiniCell
                      label="Right 2"
                      value={currentLetterEncrypt.outputChar}
                      highlight="encrypt"
                    />
                  </div>
                </StepCard>
              </>
            )}

            {mode === 'decrypt' && currentDigitDecrypt && (
              <StepCard accent="decrypt" title="Digit · Up 1 → Left 1">
                <p>
                  Reverse the digit path: <strong>up</strong> once, then <strong>left</strong> once
                  (with wrap).
                </p>
                <MonoRow>
                  <span className="font-bold">{currentDigitDecrypt.inputChar}</span>
                  <CornerDownRight className="h-4 w-4 text-decrypt rotate-180" />
                  <span className="font-bold">{currentDigitDecrypt.step_up}</span>
                  <ArrowRight className="h-4 w-4 text-decrypt" />
                  <span className="font-bold text-decrypt-deep">{currentDigitDecrypt.outputChar}</span>
                </MonoRow>
                <NumberGridTraversal
                  accent="decrypt"
                  path={[
                    currentDigitDecrypt.inputChar,
                    currentDigitDecrypt.step_up,
                    currentDigitDecrypt.outputChar,
                  ]}
                  labels={['Cipher', 'Up 1', 'Left 1 (Plain)']}
                />
              </StepCard>
            )}

            {mode === 'decrypt' && currentLetterDecrypt && (
              <>
                <StepCard accent="decrypt" title="Decrypt 1 · Inverse finisher">
                  <p>
                    Reverse path from <strong>{currentLetterDecrypt.inputChar}</strong>: left 2 →
                    down 1 → right 1 → down 1.
                  </p>
                  <GridTraversalAnimation
                    accent="decrypt"
                    path={[
                      currentLetterDecrypt.inputChar,
                      currentLetterDecrypt.step1_inverseMoves.left1,
                      currentLetterDecrypt.step1_inverseMoves.left2,
                      currentLetterDecrypt.step1_inverseMoves.down1,
                      currentLetterDecrypt.step1_inverseMoves.right1,
                      currentLetterDecrypt.step1_letter,
                    ]}
                    labels={['Start', 'Left 1', 'Left 2', 'Down 1', 'Right 1', 'Down 1 (Restore)']}
                  />
                  <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    <MiniCell label="Left 1" value={currentLetterDecrypt.step1_inverseMoves.left1} />
                    <MiniCell label="Left 2" value={currentLetterDecrypt.step1_inverseMoves.left2} />
                    <MiniCell label="Down 1" value={currentLetterDecrypt.step1_inverseMoves.down1} />
                    <MiniCell label="Right 1" value={currentLetterDecrypt.step1_inverseMoves.right1} />
                    <MiniCell
                      label="Down 1"
                      value={currentLetterDecrypt.step1_letter}
                      highlight="decrypt"
                    />
                  </div>
                </StepCard>

                <StepCard accent="neutral" title="Decrypt 2 · Column up 13×">
                  <p>
                    From <strong>{currentLetterDecrypt.step1_letter}</strong>, shift up 13 in column
                    (mod column length).
                  </p>
                  <MonoRow>
                    <span className="font-bold">{currentLetterDecrypt.step1_letter}</span>
                    <ArrowRight className="h-4 w-4 text-[#7a4a22]" />
                    <span className="text-xs text-[#7a4a22]">up 13</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="font-bold">{currentLetterDecrypt.step2_letter}</span>
                  </MonoRow>
                </StepCard>

                <StepCard accent="decrypt" title="Decrypt 3 · Inverse cycle walk">
                  <p>Modular inverse walk recovers plaintext.</p>
                  <MonoRow>
                    <span className="font-bold">{currentLetterDecrypt.step2_letter}</span>
                    <ArrowRight className="h-4 w-4 text-decrypt" />
                    <span className="text-xs text-[#7a4a22]">inverse</span>
                    <ArrowRight className="h-4 w-4 text-decrypt" />
                    <span className="font-bold text-decrypt-deep">
                      {currentLetterDecrypt.outputChar}
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

function GridTraversalAnimation({
  path,
  labels,
  accent = 'encrypt',
}: {
  path: string[];
  labels: string[];
  accent?: 'encrypt' | 'decrypt';
}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % path.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [path.length]);

  const activeChar = path[activeStep];
  const activeLabel = labels[activeStep] || '';

  const activeColor =
    accent === 'encrypt'
      ? 'bg-[#D4A017] text-white ring-2 ring-[#D4A017]/60 shadow-md font-black scale-110 z-10 border border-[#8C640C]'
      : 'bg-[#2F8F6B] text-white ring-2 ring-[#2F8F6B]/60 shadow-md font-black scale-110 z-10 border border-[#1F6B4F]';

  const visitedColor =
    accent === 'encrypt'
      ? 'bg-[#D4A017]/25 text-[#8C640C] font-bold border border-[#D4A017]/40'
      : 'bg-[#2F8F6B]/25 text-[#1F6B4F] font-bold border border-[#2F8F6B]/40';

  return (
    <div className="mt-3 flex flex-col items-center gap-2.5 rounded-xl border border-[#5c3310]/15 bg-[#fffef0]/90 p-3 sm:p-4">
      {/* Current Animated Status Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#7a4a22]">Traversal Step {activeStep + 1}/{path.length}:</span>
        <span
          className={`fit-ellipsis max-w-[min(100%,11rem)] px-2 py-0.5 rounded font-bold text-xs ${
            accent === 'encrypt' ? 'bg-[#D4A017]/20 text-[#8C640C]' : 'bg-[#2F8F6B]/20 text-[#1F6B4F]'
          }`}
          title={`${activeLabel}: ${activeChar}`}
        >
          {activeLabel}: <strong className="text-[#3d220f] font-black text-sm">{activeChar}</strong>
        </span>
      </div>

      {/* 5-Column Grid Display (26 Letters) */}
      <div className="grid grid-cols-5 gap-1 font-mono text-xs">
        {CIPHER_GRID.map((row, rIdx) =>
          [0, 1, 2, 3, 4].map((cIdx) => {
            const char = row[cIdx];
            if (!char) {
              return (
                <div
                  key={`empty-${rIdx}-${cIdx}`}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#5c3310]/[0.03] border border-[#5c3310]/[0.08] flex items-center justify-center text-[#5c3310]/20 text-[9px]"
                >
                  ·
                </div>
              );
            }
            const isCurrent = char === activeChar;
            const visitedIdx = path.slice(0, activeStep + 1).lastIndexOf(char);
            const isVisited = visitedIdx !== -1;

            return (
              <div
                key={`grid-${char}`}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center transition-all ${
                  isCurrent
                    ? activeColor
                    : isVisited
                    ? visitedColor
                    : 'bg-white text-[#4a2c14]/70 border border-[#5c3310]/15'
                }`}
              >
                {char}
              </div>
            );
          })
        )}
      </div>

      {/* Step Sequence Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono mt-1">
        {path.map((char, idx) => (
          <button
            key={`step-${idx}`}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`fit-ellipsis max-w-[9rem] px-2 py-0.5 rounded transition-all cursor-pointer ${
              idx === activeStep
                ? accent === 'encrypt'
                  ? 'bg-[#D4A017] text-white font-bold shadow-xs'
                  : 'bg-[#2F8F6B] text-white font-bold shadow-xs'
                : 'bg-[#5c3310]/8 text-[#4a2c14] hover:bg-[#5c3310]/15'
            }`}
            title={labels[idx] ? `${labels[idx]}: ${char}` : char}
          >
            {labels[idx] ? `${labels[idx]}: ` : ''}{char}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumberGridTraversal({
  path,
  labels,
  accent = 'encrypt',
}: {
  path: string[];
  labels: string[];
  accent?: 'encrypt' | 'decrypt';
}) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % path.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [path.length]);

  const activeChar = path[activeStep];
  const activeLabel = labels[activeStep] || '';

  const activeColor =
    accent === 'encrypt'
      ? 'bg-[#D4A017] text-white ring-2 ring-[#D4A017]/60 shadow-md font-black scale-110 z-10 border border-[#8C640C]'
      : 'bg-[#2F8F6B] text-white ring-2 ring-[#2F8F6B]/60 shadow-md font-black scale-110 z-10 border border-[#1F6B4F]';

  const visitedColor =
    accent === 'encrypt'
      ? 'bg-[#D4A017]/25 text-[#8C640C] font-bold border border-[#D4A017]/40'
      : 'bg-[#2F8F6B]/25 text-[#1F6B4F] font-bold border border-[#2F8F6B]/40';

  return (
    <div className="mt-3 flex flex-col items-center gap-2.5 rounded-xl border border-[#5c3310]/15 bg-[#fffef0]/90 p-3 sm:p-4">
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[#7a4a22]">Step {activeStep + 1}/{path.length}:</span>
        <span
          className={`fit-ellipsis max-w-[min(100%,11rem)] px-2 py-0.5 rounded font-bold text-xs ${
            accent === 'encrypt' ? 'bg-[#D4A017]/20 text-[#8C640C]' : 'bg-[#2F8F6B]/20 text-[#1F6B4F]'
          }`}
          title={`${activeLabel}: ${activeChar}`}
        >
          {activeLabel}: <strong className="text-[#3d220f] font-black text-sm">{activeChar}</strong>
        </span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 font-mono text-sm">
        {DIGIT_GRID.map((row, rIdx) =>
          row.map((digit, cIdx) => {
            const isCurrent = digit === activeChar;
            const visitedIdx = path.slice(0, activeStep + 1).lastIndexOf(digit);
            const isVisited = visitedIdx !== -1;

            return (
              <div
                key={`digit-${rIdx}-${cIdx}`}
                className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg transition-all ${
                  isCurrent
                    ? activeColor
                    : isVisited
                      ? visitedColor
                      : 'border border-[#5c3310]/15 bg-white text-[#4a2c14]/80'
                }`}
              >
                {digit}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono">
        {path.map((char, idx) => (
          <button
            key={`digit-step-${idx}`}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`fit-ellipsis max-w-[9rem] cursor-pointer rounded px-2 py-0.5 transition-all ${
              idx === activeStep
                ? accent === 'encrypt'
                  ? 'bg-[#D4A017] font-bold text-white shadow-xs'
                  : 'bg-[#2F8F6B] font-bold text-white shadow-xs'
                : 'bg-[#5c3310]/8 text-[#4a2c14] hover:bg-[#5c3310]/15'
            }`}
            title={labels[idx] ? `${labels[idx]}: ${char}` : char}
          >
            {labels[idx] ? `${labels[idx]}: ` : ''}
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}

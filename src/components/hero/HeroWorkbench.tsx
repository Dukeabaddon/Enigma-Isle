import { useState, useEffect } from 'react';
import { ChevronsUpDown, Key } from 'lucide-react';
import { useCipher } from '@/hooks/useCipher';
import ResultExpand from './ResultExpand';
import StepsModal from './StepsModal';
import HeroSkyBirds from './HeroSkyBirds';

/** Plate top #f2ebd9 (hero art). Seam brown bottom ADR 004. NO CSS wave clip. */
const HERO_PLATE = '#f2ebd9';

export default function HeroWorkbench() {
  const {
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
  } = useCipher();

  const [stepsModalOpen, setStepsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<'encrypt' | 'decrypt'>('encrypt');

  // Smooth scroll to result section below hero
  useEffect(() => {
    if (isExpanded && (encryptResult || decryptResult)) {
      const timer = setTimeout(() => {
        const el = document.getElementById('cipher-result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, encryptResult, decryptResult]);

  const handlePrimaryClick = () => {
    if (activeAction === 'encrypt') {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  /** Switch mode only — never runs cipher */
  const handleCycleMode = () => {
    setActiveAction((prev) => (prev === 'encrypt' ? 'decrypt' : 'encrypt'));
  };

  return (
    <>
      {/* Section 1 — Hero only. Never re-add wave clipPath. */}
      <section
        id="workbench"
        className="hero-workbench-shell relative z-[6] w-full overflow-hidden min-h-[100dvh] sm:min-h-[135dvh] flex flex-col rounded-t-none rounded-b-3xl sm:rounded-b-[40px]"
        style={{ backgroundColor: HERO_PLATE }}
      >
        {/* Desktop: full-width art + sky bridge; mobile: portrait cover fills 100dvh */}
        <div
          className="absolute inset-0 z-0 overflow-hidden rounded-t-none rounded-b-[inherit] pointer-events-none select-none"
          style={{ backgroundColor: HERO_PLATE }}
        >
          <div className="hidden sm:flex h-full w-full flex-col justify-end">
            <div className="min-h-16 flex-1 w-full shrink" style={{ backgroundColor: HERO_PLATE }} />
            <div className="relative w-full leading-none">
              <img
                src="/images/hero-island.webp"
                alt=""
                width={3200}
                height={1312}
                decoding="async"
                className="w-full max-w-full h-auto"
              />
              <div
                className="absolute inset-x-0 top-0 h-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${HERO_PLATE} 0%, transparent 100%)`,
                }}
                aria-hidden
              />
            </div>
          </div>
          <div className="sm:hidden absolute inset-0">
            <img
              src="/images/hero-island-mobile.webp"
              alt=""
              width={1536}
              height={2752}
              decoding="async"
              className="h-full w-full object-cover object-bottom"
            />
            <div
              className="absolute inset-x-0 top-0 h-40 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom, ${HERO_PLATE} 0%, ${HERO_PLATE}ee 35%, transparent 100%)`,
              }}
              aria-hidden
            />
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-0 h-32 sm:h-40 z-[1] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${HERO_PLATE} 0%, transparent 100%)`,
          }}
          aria-hidden
        />

        <HeroSkyBirds />

        {/* Title + input — mobile: input only +35px; ⇅ switch on all sizes */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 flex flex-col items-center justify-start text-center flex-1 pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <h1 className="font-hero text-5xl sm:text-7xl md:text-8xl tracking-wide text-ink mb-3 drop-shadow-xs">
            ENIGMA ISLE
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-ink font-semibold mb-8 leading-relaxed">
            Drop in a secret phrase. Watch the island grid twist, hop, and lock your message into an unbreakable puzzle.
          </p>

          <div className="w-full max-w-2xl text-left mt-[35px] sm:mt-0">
            <label htmlFor="message-input" className="sr-only">
              Secret message
            </label>
            <div className="flex min-w-0 items-stretch overflow-hidden rounded-2xl border-2 border-ink/20 bg-white/95 backdrop-blur-md shadow-xl transition-all focus-within:border-ink/50 focus-within:ring-2 focus-within:ring-ink/10">
              <input
                id="message-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a secret phrase…"
                className="fit-ellipsis min-w-0 flex-1 bg-transparent px-4 sm:px-5 py-3.5 font-mono text-base text-ink placeholder:text-ink-muted/60 outline-none rounded-l-2xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handlePrimaryClick();
                  }
                }}
              />

              {/* Chevron cycles mode only; primary runs cipher */}
              <button
                type="button"
                data-testid="cipher-toggle"
                onClick={handleCycleMode}
                aria-label={
                  activeAction === 'encrypt'
                    ? 'Switch to decrypt'
                    : 'Switch to encrypt'
                }
                title="Switch Encrypt / Decrypt"
                className="inline-flex min-h-12 w-11 sm:w-12 shrink-0 items-center justify-center border-l border-ink/10 text-ink/70 hover:bg-ink/5 active:bg-ink/10 transition-colors cursor-pointer"
              >
                <ChevronsUpDown className="h-5 w-5" aria-hidden />
              </button>

              <div className="relative shrink-0 flex items-stretch">
                {activeAction === 'encrypt' ? (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    aria-label="Encrypt"
                    title="Run Encryption"
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-4 sm:px-6 text-xs font-bold uppercase tracking-wider bg-[#D4A017] hover:bg-[#C29012] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap cursor-pointer"
                  >
                    <Key className="h-4 w-4 text-white" aria-hidden />
                    <span className="font-bold">Encrypt</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    aria-label="Decrypt"
                    title="Run Decryption"
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-4 sm:px-6 text-xs font-bold uppercase tracking-wider bg-[#2F8F6B] hover:bg-[#267759] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap cursor-pointer"
                  >
                    <Key className="h-4 w-4 text-white" aria-hidden />
                    <span className="font-bold">Decrypt</span>
                  </button>
                )}

              </div>
            </div>

            {error && (
              <p className="text-xs text-red-600 font-medium px-1 pt-2 animate-in fade-in">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Section 2 — Cipher result (below hero, pushes About down) */}
      <ResultExpand
        isExpanded={isExpanded}
        mode={mode === 'decrypt' ? 'decrypt' : 'encrypt'}
        encryptResult={encryptResult}
        decryptResult={decryptResult}
        onOpenSteps={() => setStepsModalOpen(true)}
        onReset={reset}
      />

      <StepsModal
        isOpen={stepsModalOpen}
        onClose={() => setStepsModalOpen(false)}
        mode={mode === 'decrypt' ? 'decrypt' : 'encrypt'}
        encryptTraces={encryptResult?.traces}
        decryptTraces={decryptResult?.traces}
      />
    </>
  );
}

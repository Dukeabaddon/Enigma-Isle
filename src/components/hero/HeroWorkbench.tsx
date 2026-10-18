import { useState, useEffect, useRef } from 'react';
import { Key } from 'lucide-react';
import { useCipher } from '@/hooks/useCipher';
import ResultExpand from './ResultExpand';
import StepsModal from './StepsModal';

/** Seam brown — measured hero-island bottom; ADR 004. NO CSS wave clip. */
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handlePrimaryClick = () => {
    setDropdownOpen(false);
    if (activeAction === 'encrypt') {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  const handleSelectAlternate = (action: 'encrypt' | 'decrypt') => {
    setActiveAction(action);
    setDropdownOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      {/* Section 1 — Hero only. Never re-add wave clipPath. */}
      <section
        id="workbench"
        className="relative w-full overflow-hidden min-h-[135dvh] flex flex-col"
        style={{ backgroundColor: '#ece0c8' }}
      >
        {/* Full-bleed island — bg-cover fills plate (100% auto left a hard sky cut) */}
        <div
          className="absolute inset-0 w-full pointer-events-none select-none z-0 overflow-hidden"
          style={{
            background:
              'linear-gradient(to bottom, #ece0c8 0%, #ece0c8 45%, #35231b 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-bottom max-sm:hidden"
            style={{
              backgroundImage: `url('/images/hero-island.webp')`,
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-bottom sm:hidden"
            style={{
              backgroundImage: `url('/images/hero-island-mobile.webp')`,
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            }}
          />
          {/* Plate-top cream fade — soft sky join */}
          <div
            className="absolute inset-x-0 top-0 h-44 sm:h-52 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #ece0c8 0%, rgba(236,224,200,0.85) 35%, transparent 100%)',
            }}
            aria-hidden
          />
        </div>

        {/* Soft sky veil: cream → transparent through top 50% */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, #ece0c8 0%, rgba(236,224,200,0.8) 20%, rgba(255,250,240,0.35) 38%, transparent 55%)',
          }}
          aria-hidden
        />

        {/* Title + input pushed down from sticky nav */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 flex flex-col items-center justify-start text-center flex-1 pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-20">
          <h1 className="font-hero text-5xl sm:text-7xl md:text-8xl tracking-wide text-ink mb-3 drop-shadow-xs">
            ENIGMA ISLE
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-ink font-semibold mb-8 leading-relaxed">
            Drop in a secret phrase. Watch the island grid twist, hop, and lock your message into an unbreakable puzzle.
          </p>

          <div className="w-full max-w-2xl text-left">
            <label htmlFor="message-input" className="sr-only">
              Secret message
            </label>
            <div className="flex items-stretch rounded-2xl border-2 border-ink/20 bg-white/95 backdrop-blur-md shadow-xl transition-all focus-within:border-ink/50 focus-within:ring-2 focus-within:ring-ink/10 overflow-visible">
              <input
                id="message-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a secret phrase…"
                className="min-w-0 flex-1 bg-transparent px-4 sm:px-5 py-3.5 font-mono text-base text-ink placeholder:text-ink-muted/60 outline-none rounded-l-2xl"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handlePrimaryClick();
                  }
                }}
              />

              <div
                ref={dropdownRef}
                className="relative shrink-0 flex items-stretch"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                {activeAction === 'encrypt' ? (
                  <button
                    type="button"
                    onClick={handlePrimaryClick}
                    aria-label="Encrypt"
                    title="Run Encryption"
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-6 text-xs font-bold uppercase tracking-wider bg-[#D4A017] hover:bg-[#C29012] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap cursor-pointer"
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
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-6 text-xs font-bold uppercase tracking-wider bg-[#2F8F6B] hover:bg-[#267759] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap cursor-pointer"
                  >
                    <Key className="h-4 w-4 text-white" aria-hidden />
                    <span className="font-bold">Decrypt</span>
                  </button>
                )}

                {dropdownOpen && (
                  <div className="absolute right-0 top-full pt-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                    {activeAction === 'encrypt' ? (
                      <button
                        type="button"
                        data-testid="cipher-toggle"
                        onClick={() => handleSelectAlternate('decrypt')}
                        title="Switch to Decrypt"
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2F8F6B] hover:bg-[#267759] text-white shadow-xl active:scale-95 transition-all whitespace-nowrap border border-white/20 cursor-pointer"
                      >
                        <Key className="h-4 w-4 text-white" />
                        <span>Decrypt</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-testid="cipher-toggle"
                        onClick={() => handleSelectAlternate('encrypt')}
                        title="Switch to Encrypt"
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#D4A017] hover:bg-[#C29012] text-white shadow-xl active:scale-95 transition-all whitespace-nowrap border border-white/20 cursor-pointer"
                      >
                        <Key className="h-4 w-4 text-white" />
                        <span>Encrypt</span>
                      </button>
                    )}
                  </div>
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

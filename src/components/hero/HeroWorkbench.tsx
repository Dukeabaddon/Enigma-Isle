import { useState, useEffect, useRef } from 'react';
import { Key } from 'lucide-react';
import { useCipher } from '@/hooks/useCipher';
import ResultExpand from './ResultExpand';
import StepsModal from './StepsModal';

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

  // Smooth scroll to expanded cipher result upon execution (Moat f9daf886)
  useEffect(() => {
    if (isExpanded && (encryptResult || decryptResult)) {
      const timer = setTimeout(() => {
        const el = document.getElementById('cipher-result');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, encryptResult, decryptResult]);

  // Close dropdown on outside click
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

  // Immediate dropdown dismissal on alternate selection (Moat 5675e5b3 & 663bd05e)
  const handleSelectAlternate = (action: 'encrypt' | 'decrypt') => {
    setActiveAction(action);
    setDropdownOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <section
      id="workbench"
      className="relative w-full overflow-hidden bg-[#3E2A22] min-h-[110dvh] flex flex-col justify-between"
    >
      {/* Hidden SVG Definition for Smooth Responsive Wave Clip-Path applied to island plate */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-island-wave-cut" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1,0 L 1,0.92 C 0.82,0.97 0.68,0.90 0.52,0.95 C 0.36,1.0 0.18,0.92 0,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Island Scenic Plate with Tuned White Fade and Wave Cut Bottom (Moat 6b0b1600 & ac5fd4b6) */}
      <div
        className="absolute top-0 left-0 right-0 h-[100dvh] pointer-events-none select-none z-0 overflow-hidden"
        style={{ clipPath: 'url(#hero-island-wave-cut)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-95 max-sm:hidden"
          style={{ backgroundImage: `url('/images/hero-island.webp')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-95 sm:hidden"
          style={{ backgroundImage: `url('/images/hero-island-mobile.webp')` }}
        />
        {/* Soft, breathable top fade revealing lush island art */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/25 to-transparent" />
      </div>

      {/* Main Hero Interactive Container - Full Screen positioned higher */}
      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-start pt-16 sm:pt-24 pb-12 text-center">
        {/* Brand Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider text-ink mb-3 drop-shadow-xs">
          ENIGMA ISLE
        </h1>

        {/* Engaging Plain Subtitle */}
        <p className="max-w-xl text-base sm:text-lg text-ink font-semibold mb-8 leading-relaxed">
          Drop in a secret phrase. Watch the island grid twist, hop, and lock your message into an unbreakable puzzle.
        </p>

        {/* Input & Single Active Button with Hover Replacement Dropdown */}
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

            {/* Key Cluster: ONLY ONE button visible at a time; clean state-controlled replacement */}
            <div
              ref={dropdownRef}
              className="relative shrink-0 flex items-stretch"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {/* Primary Active Button */}
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

              {/* State-controlled Dropdown: Closes immediately on selection (Moat 5675e5b3) */}
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

      {/* Expand Result Region (grows downward, pushing Section 2 below) */}
      <ResultExpand
        isExpanded={isExpanded}
        mode={mode === 'decrypt' ? 'decrypt' : 'encrypt'}
        encryptResult={encryptResult}
        decryptResult={decryptResult}
        onOpenSteps={() => setStepsModalOpen(true)}
        onReset={reset}
      />

      {/* Deep-Dive Step Trace Modal */}
      <StepsModal
        isOpen={stepsModalOpen}
        onClose={() => setStepsModalOpen(false)}
        mode={mode === 'decrypt' ? 'decrypt' : 'encrypt'}
        encryptTraces={encryptResult?.traces}
        decryptTraces={decryptResult?.traces}
      />
    </section>
  );
}

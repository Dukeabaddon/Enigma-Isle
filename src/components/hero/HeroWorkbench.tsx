import { useState } from 'react';
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

  const handlePrimaryClick = () => {
    if (activeAction === 'encrypt') {
      handleEncrypt();
    } else {
      handleDecrypt();
    }
  };

  const handleSelectAlternate = (action: 'encrypt' | 'decrypt') => {
    setActiveAction(action);
    setDropdownOpen(false);
  };

  return (
    <section
      id="workbench"
      className="relative w-full overflow-hidden bg-white min-h-[110dvh] flex flex-col justify-between"
    >
      {/* Background Island Scenic Plate with Tuned White Fade — Fixed to top 100dvh */}
      <div className="absolute top-0 left-0 right-0 h-[100dvh] pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-95 max-sm:hidden"
          style={{ backgroundImage: `url('/images/hero-island.webp')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-95 sm:hidden"
          style={{ backgroundImage: `url('/images/hero-island-mobile.webp')` }}
        />
        {/* Soft, breathable top fade revealing lush island art */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/20 to-transparent" />
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

            {/* Key Cluster: ONLY ONE button visible at a time; hover dropdown switches active */}
            <div
              className="relative group shrink-0 flex items-stretch"
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
                  className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-6 text-xs font-bold uppercase tracking-wider bg-[#D4A017] hover:bg-[#C29012] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap"
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
                  className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-r-[14px] px-6 text-xs font-bold uppercase tracking-wider bg-[#2F8F6B] hover:bg-[#267759] text-white active:scale-95 transition-all shadow-none sm:min-w-[6.5rem] border-l border-ink/10 whitespace-nowrap"
                >
                  <Key className="h-4 w-4 text-white" aria-hidden />
                  <span className="font-bold">Decrypt</span>
                </button>
              )}

              {/* Hover / Focus Dropdown: Replaces active button upon click */}
              <div
                className={`absolute right-0 top-full pt-1.5 z-30 ${
                  dropdownOpen ? 'block' : 'hidden group-hover:block group-focus-within:block'
                }`}
              >
                {activeAction === 'encrypt' ? (
                  <button
                    type="button"
                    data-testid="cipher-toggle"
                    onClick={() => handleSelectAlternate('decrypt')}
                    title="Switch to Decrypt"
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#2F8F6B] hover:bg-[#267759] text-white shadow-xl active:scale-95 transition-all whitespace-nowrap border border-white/20"
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
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#D4A017] hover:bg-[#C29012] text-white shadow-xl active:scale-95 transition-all whitespace-nowrap border border-white/20"
                  >
                    <Key className="h-4 w-4 text-white" />
                    <span>Encrypt</span>
                  </button>
                )}
              </div>
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

      {/* Bottom Curve Wave Transition matching Section 2 Brown Dirt #3E2A22 */}
      {!isExpanded && (
        <div className="relative z-20 w-full overflow-hidden leading-none pointer-events-none -mb-1">
          <svg
            className="w-full h-8 sm:h-14 text-[#3E2A22]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
          </svg>
        </div>
      )}
    </section>
  );
}

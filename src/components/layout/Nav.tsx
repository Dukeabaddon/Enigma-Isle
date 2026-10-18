import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#D8C7A5]/80 shadow-[0_4px_16px_rgba(92,64,51,0.08)]'
          : 'bg-white/40 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Link: Icon only without bg box, larger icon, no subtitle */}
        <a href="#workbench" className="flex items-center gap-3 group">
          <img
            src="/images/nav-icon.webp"
            alt="Enigma Isle Logo"
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display font-extrabold text-xl tracking-tight text-ink drop-shadow-2xs">
            ENIGMA ISLE
          </span>
        </a>

        {/* Desktop signpost nav links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/75">
          <a
            href="#workbench"
            className="px-3.5 py-1.5 rounded-lg border border-transparent hover:border-[#D8C7A5]/70 hover:bg-black/5 hover:text-ink transition-all"
          >
            Workbench
          </a>
          <a
            href="#table"
            className="px-3.5 py-1.5 rounded-lg border border-transparent hover:border-[#D8C7A5]/70 hover:bg-black/5 hover:text-ink transition-all"
          >
            Letter Grid
          </a>
          <a
            href="#encrypt-journey"
            className="px-3.5 py-1.5 rounded-lg border border-transparent hover:border-[#D8C7A5]/70 hover:bg-black/5 hover:text-ink transition-all"
          >
            Encryption
          </a>
          <a
            href="#decrypt-journey"
            className="px-3.5 py-1.5 rounded-lg border border-transparent hover:border-[#D8C7A5]/70 hover:bg-black/5 hover:text-ink transition-all"
          >
            Decryption
          </a>
        </nav>

        {/* Tactile Brass Plate CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#workbench"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-gradient-to-b from-[#E5B53A] via-[#D4A017] to-[#B3830E] text-white text-xs font-bold tracking-wider uppercase border border-[#8C640C] shadow-[0_2px_4px_rgba(92,64,51,0.25),inset_0_1px_0_rgba(255,255,255,0.4)] hover:brightness-105 active:scale-95 transition-all min-h-[44px]"
          >
            Try Cipher
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-ink hover:bg-black/5 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D8C7A5] bg-[#FAF6EE] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#workbench"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink hover:bg-black/5"
          >
            Workbench
          </a>
          <a
            href="#table"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink hover:bg-black/5"
          >
            Letter Grid
          </a>
          <a
            href="#encrypt-journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink hover:bg-black/5"
          >
            Encryption Journey
          </a>
          <a
            href="#decrypt-journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink hover:bg-black/5"
          >
            Decryption Journey
          </a>
          <div className="pt-2">
            <a
              href="#workbench"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gradient-to-b from-[#E5B53A] via-[#D4A017] to-[#B3830E] text-white text-xs font-bold tracking-wider uppercase border border-[#8C640C] shadow-sm min-h-[44px]"
            >
              Try Cipher
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

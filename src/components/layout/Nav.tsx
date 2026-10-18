import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300">
      {/* Floating Pill Nav Shell (Matching Image 3 Reference) */}
      <div className="rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Link on the Left */}
        <a href="#workbench" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <img
            src="/images/nav-icon.webp"
            alt="Enigma Isle Logo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-ink">
            ENIGMA ISLE
          </span>
        </a>

        {/* Desktop Nav Links Centered */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium text-ink/75">
          <a
            href="#workbench"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Workbench
          </a>
          <a
            href="#table"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Letter Grid
          </a>
          <a
            href="#encrypt-journey"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Encryption
          </a>
          <a
            href="#decrypt-journey"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Decryption
          </a>
        </nav>

        {/* Desktop Pill CTA Button on the Right */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#workbench"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1c1b18] hover:bg-[#2c2b26] text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 min-h-[40px]"
          >
            Try Cipher
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-ink hover:bg-black/5 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Floating Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] p-4 space-y-1 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <a
            href="#workbench"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
          >
            Workbench
          </a>
          <a
            href="#table"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
          >
            Letter Grid
          </a>
          <a
            href="#encrypt-journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
          >
            Encryption
          </a>
          <a
            href="#decrypt-journey"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
          >
            Decryption
          </a>
          <div className="pt-2">
            <a
              href="#workbench"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-full bg-[#1c1b18] text-white text-xs font-bold uppercase tracking-wider shadow-sm min-h-[44px]"
            >
              Try Cipher
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

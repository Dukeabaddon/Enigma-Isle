import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="nav-site-header fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl pt-[env(safe-area-inset-top,0px)]"
    >
      {/* Pill stays pill — no radius morph */}
      <div className="nav-site-pill rounded-full border border-black/[0.08] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between sm:bg-white/95 sm:backdrop-blur-md">
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
            Table
          </a>
          <a
            href="#encrypt-journey"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Encrypt steps
          </a>
          <a
            href="#decrypt-journey"
            className="px-3.5 py-1.5 rounded-full hover:bg-black/5 hover:text-ink transition-colors"
          >
            Decrypt steps
          </a>
        </nav>

        <div className="hidden md:flex items-center shrink-0">
          <a
            href="#workbench"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-encrypt hover:bg-encrypt-deep text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 min-h-[40px]"
          >
            Encrypt
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="md:hidden p-2 rounded-full text-ink hover:bg-black/5 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Absolute panel — fade/slide 200ms; no height animation */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-black/[0.08] p-4 space-y-1 shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
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
          Table
        </a>
        <a
          href="#encrypt-journey"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
        >
          Encrypt steps
        </a>
        <a
          href="#decrypt-journey"
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-black/5 transition-colors"
        >
          Decrypt steps
        </a>
        <div className="pt-2">
          <a
            href="#workbench"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full py-2.5 rounded-full bg-encrypt hover:bg-encrypt-deep text-white text-xs font-bold uppercase tracking-wider shadow-sm min-h-[44px]"
          >
            Encrypt
          </a>
        </div>
      </div>
    </header>
  );
}

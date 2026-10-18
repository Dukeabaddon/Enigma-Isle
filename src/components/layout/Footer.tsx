import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0f1911] text-white/80 overflow-hidden">
      {/*
        Island plate — cream only (no dark border/fade).
        9603382 border-b #0f1911 + bottom gradient re-drew the hairlines.
      */}
      <div className="relative w-full overflow-hidden leading-none select-none bg-[#eaddbf] seam-overlap">
        <img
          src="/images/footer-island.webp"
          alt=""
          className="w-full h-auto block select-none pointer-events-none"
          width={3392}
          height={1248}
        />
        {/* Soft cream at image TOP only — blend into TryAgain, no dark paint */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-4 z-[1]"
          style={{
            background:
              'linear-gradient(to bottom, #eaddbf 0%, transparent 100%)',
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-10 pb-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/nav-icon.webp"
                alt="Enigma Isle"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
              <span className="font-display font-black text-2xl tracking-tight text-white block">
                ENIGMA ISLE
              </span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed max-w-md font-medium">
              Encrypt and decrypt messages in your browser with a reversible letter grid. No account. No server.
            </p>
          </div>

          <div className="md:col-span-5 space-y-3">
            <h4 className="font-display font-black text-xs tracking-wider uppercase text-white/90">
              On this page
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#workbench" className="hover:text-white transition-colors text-white/65">
                  Workbench
                </a>
              </li>
              <li>
                <a href="#table" className="hover:text-white transition-colors text-white/65">
                  Letter grid
                </a>
              </li>
              <li>
                <a href="#encrypt-journey" className="hover:text-white transition-colors text-white/65">
                  How encryption works
                </a>
              </li>
              <li>
                <a href="#decrypt-journey" className="hover:text-white transition-colors text-white/65">
                  How decryption works
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex items-center justify-end text-xs text-white/50">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors font-medium group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

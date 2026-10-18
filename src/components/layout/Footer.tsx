import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#111613] text-white/80 overflow-hidden">
      {/* Background Island Silhouette Plate (footer-island.webp) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div
          className="w-full h-full bg-cover bg-top bg-no-repeat"
          style={{
            backgroundImage: `url('/images/footer-island.webp')`,
          }}
        />
        {/* Soft top blend into #EAE0CA */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#EAE0CA] via-[#EAE0CA]/40 to-transparent" />
        {/* Dark gradient for lower text readability */}
        <div className="absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t from-[#111613] via-[#111613]/90 to-transparent" />
      </div>

      {/* Content strictly over the dark lower band of the art */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-48 sm:pt-64 pb-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Brand & Overview (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/nav-icon.webp"
                alt="Enigma Isle Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
              <span className="font-display font-black text-2xl tracking-tight text-white block">
                ENIGMA ISLE
              </span>
            </div>

            <p className="text-sm text-white/75 leading-relaxed max-w-md font-medium">
              An interactive cryptographic tool demonstrating reversible grid permutation. Plaintext letters advance across cyclic rings and coordinate vectors, reversing identically without collision.
            </p>
          </div>

          {/* Expedition Log (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-black text-xs tracking-wider uppercase text-white/90">
              Expedition Log
            </h4>
            <div className="space-y-2 text-xs text-white/65 font-medium">
              <div>Runs in your browser</div>
              <div>Pure client-side code</div>
              <div>No backend required</div>
              <div>Zero collision rate</div>
            </div>
          </div>

          {/* Navigation Landmarks (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-black text-xs tracking-wider uppercase text-white/90">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#workbench" className="hover:text-white transition-colors text-white/65">
                  Workbench
                </a>
              </li>
              <li>
                <a href="#table" className="hover:text-white transition-colors text-white/65">
                  Letter Grid
                </a>
              </li>
              <li>
                <a href="#encrypt-journey" className="hover:text-white transition-colors text-white/65">
                  Forward Pipeline
                </a>
              </li>
              <li>
                <a href="#decrypt-journey" className="hover:text-white transition-colors text-white/65">
                  Inverse Pipeline
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Minimalist Bar with Back to Top */}
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

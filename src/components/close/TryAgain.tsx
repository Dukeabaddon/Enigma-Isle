import { ArrowUp } from 'lucide-react';

export default function TryAgain() {
  const scrollToWorkbench = () => {
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#EDF5F1] via-[#F4EBD9] to-[#EAE0CA] py-20 sm:py-28 px-4 sm:px-6 overflow-hidden text-center">
      {/* Warm Ambient Vault Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-[#D4A017]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Screen reader heading for accessibility */}
      <h2 className="sr-only">Interactive Cipher Workbench — Unlock the Island Cipher</h2>

      {/* Woodboard Plaque with Painted Typography and Real Embedded Button */}
      <div className="relative max-w-lg sm:max-w-xl md:max-w-2xl mx-auto w-full">
        <img
          src="/images/woodboard-workbench.webp"
          alt="Interactive Cipher Workbench — Unlock the Island Cipher"
          className="w-full h-auto drop-shadow-2xl select-none"
          width={2126}
          height={1652}
        />

        {/* Real HTML Button Centered on the Empty Lower Planks of the Woodboard */}
        <button
          type="button"
          onClick={scrollToWorkbench}
          className="absolute left-1/2 -translate-x-1/2 top-[82%] -translate-y-1/2 inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 rounded-xl bg-gradient-to-b from-[#E5B53A] via-[#D4A017] to-[#B3830E] text-white font-display font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_4px_16px_rgba(40,25,15,0.6),inset_0_1px_0_rgba(255,255,255,0.5)] border-2 border-[#7A5408] hover:brightness-105 active:scale-95 transition-all min-h-[48px] whitespace-nowrap z-20 cursor-pointer"
        >
          <span>Try Cipher</span>
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
        </button>

        {/* Island Treasure Chest Accent (public/images/treasure-chest.webp) */}
        <img
          src="/images/treasure-chest.webp"
          alt="Golden Island Treasure Chest"
          className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-8 md:-bottom-12 md:-right-12 w-28 sm:w-40 md:w-52 h-auto drop-shadow-2xl pointer-events-none select-none z-30"
          width={1712}
          height={1685}
        />
      </div>
    </section>
  );
}

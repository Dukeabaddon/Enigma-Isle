import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function StepCards() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Animation ticks for the silent loops
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 1000);
    }, 1500);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Card 1 Loop State: A -> B -> C -> S -> ...
  const card1Examples = [
    { char: 'S', val: 19, total: 342 },
    { char: 'A', val: 1, total: 18 },
    { char: 'B', val: 2, total: 36 },
    { char: 'U', val: 21, total: 378 },
  ];
  const c1Current = card1Examples[tick % card1Examples.length];

  // Card 2 Loop State: hopping on ring
  const ringStep = tick % 6;

  // Card 3 Loop State: dropping in column
  const dropStep = tick % 5;

  return (
    <div className="w-full">
      {/* S3 — How Encryption Works on Dirt Ground (Moat a8d1d1a2) */}
      <div className="w-full bg-[#3c2820] px-3 sm:px-6 lg:px-8 pb-10 sm:pb-16 relative">
        <section
          id="encrypt-journey"
          className="relative bg-[#FAF4E8] text-ink pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 scroll-mt-20 overflow-hidden rounded-3xl sm:rounded-[36px] shadow-2xl border border-[#D4A017]/20"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Simplified Centered Header (Tasks 5 & 6) */}
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
                How Encryption Works
              </h2>
              <p className="text-base sm:text-lg text-ink/80 font-medium">
                Four sequential transformations applied forward to every character. Each card illustrates a mechanical step with a live visual loop.
              </p>
            </div>

            {/* Cards Container with Mascot Anchored on the Left Flank (Moat a4bd70cc) */}
            <div className="relative">
              {/* Desktop Mascot: Standing still on left edge directly adjacent to Card 1 */}
              <div className="hidden xl:flex absolute -left-20 2xl:-left-32 top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none select-none z-20">
                <img
                  src="/images/mascot-enigma.webp"
                  alt="Enigma Isle explorer mascot"
                  className="w-40 2xl:w-44 h-auto object-contain drop-shadow-xl select-none"
                  width={1369}
                  height={1679}
                />
              </div>

            {/* Mobile/Tablet inline explorer guide header on the left side */}
            <div className="xl:hidden flex items-center gap-3.5 mb-6 bg-[#F5EDE0] px-4 py-2.5 rounded-2xl border border-[#E0D0B5] max-w-md">
              <img
                src="/images/mascot-enigma.webp"
                alt="Enigma Isle explorer mascot"
                className="w-16 sm:w-20 h-auto object-contain drop-shadow-md shrink-0 select-none"
                width={1369}
                height={1679}
              />
              <div className="space-y-0.5">
                <span className="font-display font-black text-xs uppercase tracking-wider text-[#B8860B] block">
                  Explorer Guide
                </span>
                <span className="font-sans font-bold text-xs text-ink/80 block">
                  Follow the 4 mechanical stages from left to right
                </span>
              </div>
            </div>

            {/* 4 Expedition Stone Tablets Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tablet 1: Value Scaling (Task 8: removed cycle steps span) */}
              <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-[#E8D5B5] shadow-md hover:border-[#D4A017] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#B8860B] bg-[#D4A017]/10 px-2.5 py-1 rounded-md border border-[#D4A017]/20">
                    Step 1 · Scale
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-ink">
                    Value Scaling
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-medium">
                    Letters convert to 1-based index (A=1...Z=26) and multiply by 18 to determine the cyclic walk distance.
                  </p>
                </div>

                {/* Large Readable Diagram Well */}
                <div className="h-36 rounded-2xl bg-[#F6EFE2] border border-[#E0D0B5] p-4 flex flex-col items-center justify-center relative shadow-inner">
                  <div className="flex items-center gap-2 font-mono">
                    <div className="w-11 h-11 rounded-xl bg-[#D4A017] text-white font-black flex items-center justify-center text-xl shadow-md border border-[#8C640C]">
                      {c1Current.char}
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/60" />
                    <div className="text-xs text-ink font-bold bg-white px-2 py-1 rounded-md border border-ink/10">
                      #{c1Current.val} × 18
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink/60" />
                    <div className="w-14 h-11 rounded-xl bg-ink text-white font-black flex items-center justify-center text-sm shadow-md">
                      {c1Current.total}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet 2: Right Walk on Alphabet (Task 7: removed cycle wrap span) */}
              <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-[#E8D5B5] shadow-md hover:border-[#D4A017] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#B8860B] bg-[#D4A017]/10 px-2.5 py-1 rounded-md border border-[#D4A017]/20">
                    Step 2 · Walk
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-ink">
                    Cyclic Right-Walk
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-medium">
                    Walk right on the continuous 26-letter cyclic alphabet (wrapping after Z back to A).
                  </p>
                </div>

                {/* Large Readable Diagram Well */}
                <div className="h-36 rounded-2xl bg-[#F6EFE2] border border-[#E0D0B5] p-3 flex flex-col items-center justify-center relative shadow-inner">
                  <div className="flex items-center gap-1 font-mono text-xs">
                    {['A', 'B', 'C', 'D', 'E', 'F'].map((ch, idx) => (
                      <div
                        key={ch}
                        className={`w-7 h-9 rounded-lg flex items-center justify-center transition-all ${
                          ringStep === idx
                            ? 'bg-[#D4A017] text-white font-black scale-110 shadow-md border border-[#8C640C]'
                            : 'bg-white border border-ink/15 text-ink font-bold'
                        }`}
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet 3: Down 5x in Column (Task 9: removed shift down in column span) */}
              <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-[#E8D5B5] shadow-md hover:border-[#D4A017] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#B8860B] bg-[#D4A017]/10 px-2.5 py-1 rounded-md border border-[#D4A017]/20">
                    Step 3 · Shift
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-ink">
                    Column Shift 5×
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-medium">
                    Letter drops 5 positions inside its vertical column. 5-slot columns cycle back to origin; Column 1 wraps across 6 slots.
                  </p>
                </div>

                {/* Large Readable Diagram Well */}
                <div className="h-36 rounded-2xl bg-[#F6EFE2] border border-[#E0D0B5] p-3 flex flex-col items-center justify-center relative shadow-inner">
                  <div className="flex flex-col gap-1 font-mono text-xs">
                    {['A', 'F', 'K', 'P', 'U'].map((ch, idx) => (
                      <div
                        key={ch}
                        className={`px-4 py-0.5 rounded-md text-center transition-all ${
                          dropStep === idx
                            ? 'bg-ink text-white font-black scale-105 shadow-sm'
                            : 'bg-white text-ink-muted font-bold border border-ink/10'
                        }`}
                      >
                        {ch}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tablet 4: Finisher Path with Full 6x5 ABCD Table Grid (Moat 91be93db) */}
              <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-7 border-2 border-[#E8D5B5] shadow-md hover:border-[#D4A017] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#B8860B] bg-[#D4A017]/10 px-2.5 py-1 rounded-md border border-[#D4A017]/20">
                    Step 4 · Vector
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-ink">
                    Vector Finisher Path
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed font-medium">
                    Four-hop coordinate routing: up 1 → left 1 → up 1 → right 2 across grid boundaries with exact inversions.
                  </p>
                </div>

                {/* Full 6x5 ABCD Table Grid Map Well matching Decrypt Step 1 (Moat 91be93db) */}
                <div className="h-40 rounded-2xl bg-[#F6EFE2] border border-[#E0D0B5] p-2 flex flex-col items-center justify-center relative shadow-inner">
                  <div className="grid grid-cols-5 gap-0.5 sm:gap-1 font-mono text-[9px]">
                    {[
                      ['A', 'B', 'C', 'D', 'E'],
                      ['F', 'G', 'H', 'I', 'J'],
                      ['K', 'L', 'M', 'N', 'O'],
                      ['P', 'Q', 'R', 'S', 'T'],
                      ['U', 'V', 'W', 'X', 'Y'],
                      ['Z', '', '', '', ''],
                    ].flatMap((row, rIdx) =>
                      row.map((char, cIdx) => {
                        if (!char) {
                          return <div key={`fwd-empty-${rIdx}-${cIdx}`} className="w-5 h-4 sm:w-5.5 sm:h-4.5" />;
                        }
                        const fwdStepPath = ['U', 'P', 'T', 'O', 'L'];
                        const currentStepChar = fwdStepPath[tick % fwdStepPath.length];
                        const isActive = currentStepChar === char;
                        const isVisited = fwdStepPath.slice(0, (tick % fwdStepPath.length) + 1).includes(char);

                        return (
                          <div
                            key={`fwd-${rIdx}-${char}`}
                            className={`w-5 h-4 sm:w-5.5 sm:h-4.5 rounded flex items-center justify-center transition-all ${
                              isActive
                                ? 'bg-[#D4A017] text-white font-black scale-110 shadow-md ring-2 ring-[#D4A017]/30 z-10'
                                : isVisited
                                ? 'bg-[#D4A017]/20 text-[#B8860B] font-bold border border-[#D4A017]/40'
                                : 'bg-white text-ink/50 border border-ink/10'
                            }`}
                          >
                            {char}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        </section>

        {/* Organic Coastal River Transition from Dirt Ground into Mint Decryption Chambers (Moat fab8251a) */}
        <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-10 -mb-1">
          <svg
            className="w-full h-8 sm:h-14 text-[#EDF5F1]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C200,80 400,-20 600,50 C800,120 1000,20 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      {/* S4 — How Decryption Works (Tasks 13, 14, 15, 16, 17, 18) */}
      <section
        id="decrypt-journey"
        className="relative bg-[#EDF5F1] text-ink pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 scroll-mt-20 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Simplified Header (Tasks 13 & 15: no badge, simplified title) */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
              How Decryption Works
            </h2>
            <p className="text-base sm:text-lg text-ink/80 font-medium">
              The inverse pipeline executes each reversal in strictly opposite order, proving mathematical bijectivity.
            </p>
          </div>

          {/* 4 Expedition Decrypt Stone Tablets Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Decrypt Tablet 1: Reverse Finisher (Task 16: removed bottom trail badge) */}
            <div className="bg-[#F8FCFA] rounded-3xl p-6 sm:p-7 border-2 border-[#C2E0D4] shadow-md hover:border-[#2F8F6B] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#1F6B4F] bg-[#2F8F6B]/10 px-2.5 py-1 rounded-md border border-[#2F8F6B]/20">
                  Step 1 · Vector
                </span>
                <h3 className="font-display font-extrabold text-xl text-ink">
                  Reverse Vectors
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-medium">
                  Applies the exact inverse vectors: left 2 → down 1 → right 1 → down 1 across boundaries.
                </p>
              </div>

              {/* Full ABCD Table Grid Map Well */}
              <div className="h-40 rounded-2xl bg-[#E4F2EC] border border-[#BCE0D1] p-2 flex flex-col items-center justify-center relative shadow-inner">
                {/* 6x5 Full Grid */}
                <div className="grid grid-cols-5 gap-0.5 sm:gap-1 font-mono text-[9px]">
                  {[
                    ['A', 'B', 'C', 'D', 'E'],
                    ['F', 'G', 'H', 'I', 'J'],
                    ['K', 'L', 'M', 'N', 'O'],
                    ['P', 'Q', 'R', 'S', 'T'],
                    ['U', 'V', 'W', 'X', 'Y'],
                    ['Z', '', '', '', ''],
                  ].flatMap((row, rIdx) =>
                    row.map((char, cIdx) => {
                      if (!char) {
                        return <div key={`empty-${rIdx}-${cIdx}`} className="w-5 h-4 sm:w-5.5 sm:h-4.5" />;
                      }
                      const stepPath = ['L', 'K', 'O', 'T', 'P', 'U'];
                      const currentStepChar = stepPath[tick % stepPath.length];
                      const isActive = currentStepChar === char;
                      const isVisited = stepPath.slice(0, (tick % stepPath.length) + 1).includes(char);

                      return (
                        <div
                          key={`${rIdx}-${char}`}
                          className={`w-5 h-4 sm:w-5.5 sm:h-4.5 rounded flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-[#2F8F6B] text-white font-black scale-110 shadow-md ring-2 ring-[#2F8F6B]/30 z-10'
                              : isVisited
                              ? 'bg-[#2F8F6B]/20 text-[#1F6B4F] font-bold border border-[#2F8F6B]/40'
                              : 'bg-white text-ink/50 border border-ink/10'
                          }`}
                        >
                          {char}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Decrypt Tablet 2: Shift Up in Column (Task 17: removed shift upward span) */}
            <div className="bg-[#F8FCFA] rounded-3xl p-6 sm:p-7 border-2 border-[#C2E0D4] shadow-md hover:border-[#2F8F6B] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#1F6B4F] bg-[#2F8F6B]/10 px-2.5 py-1 rounded-md border border-[#2F8F6B]/20">
                  Step 2 · Shift
                </span>
                <h3 className="font-display font-extrabold text-xl text-ink">
                  Column Shift Up 5×
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-medium">
                  Shifts upward 5 positions inside the vertical column, returning Column 1 elements to original rows.
                </p>
              </div>

              <div className="h-40 rounded-2xl bg-[#E4F2EC] border border-[#BCE0D1] p-3 flex flex-col items-center justify-center relative shadow-inner">
                <div className="flex flex-col gap-1 font-mono text-xs w-full max-w-[70px]">
                  {['A', 'F', 'K', 'P', 'U'].map((ch, idx) => {
                    const activeIdx = 4 - (tick % 5);
                    const isCurrent = activeIdx === idx;
                    return (
                      <div
                        key={ch}
                        className={`py-1 rounded-md text-center transition-all ${
                          isCurrent
                            ? 'bg-[#2F8F6B] text-white font-black scale-105 shadow-sm'
                            : 'bg-white text-ink-muted font-bold border border-ink/10'
                        }`}
                      >
                        {ch}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Decrypt Tablet 3: Reverse Cyclic Walk (Task 18: removed 1:1 modular recovery span) */}
            <div className="bg-[#F8FCFA] rounded-3xl p-6 sm:p-7 border-2 border-[#C2E0D4] shadow-md hover:border-[#2F8F6B] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#1F6B4F] bg-[#2F8F6B]/10 px-2.5 py-1 rounded-md border border-[#2F8F6B]/20">
                  Step 3 · Walk
                </span>
                <h3 className="font-display font-extrabold text-xl text-ink">
                  Reverse Cyclic Walk
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-medium">
                  Reverses the forward 18-step cyclic walk. Stepping backward 11 positions mod 26 recovers the original letter.
                </p>
              </div>

              <div className="h-40 rounded-2xl bg-[#E4F2EC] border border-[#BCE0D1] p-4 flex flex-col items-center justify-center relative shadow-inner">
                <div className="font-mono text-xs font-black text-ink bg-white px-4 py-3 rounded-xl border border-[#2F8F6B]/30 shadow-sm flex items-center gap-2">
                  <span>(11 × Value + 10)</span>
                  <span className="text-[#1F6B4F] font-mono text-xs font-bold">mod 26</span>
                </div>
              </div>
            </div>

            {/* Decrypt Tablet 4: Plaintext Recovery */}
            <div className="bg-[#F8FCFA] rounded-3xl p-6 sm:p-7 border-2 border-[#C2E0D4] shadow-md hover:border-[#2F8F6B] hover:shadow-xl transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-2.5">
                <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#1F6B4F] bg-[#2F8F6B]/10 px-2.5 py-1 rounded-md border border-[#2F8F6B]/20">
                  Step 4 · Restore
                </span>
                <h3 className="font-display font-extrabold text-xl text-ink">
                  Plaintext Recovery
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-medium">
                  The original plaintext letter is restored with 100% mathematical fidelity.
                </p>
              </div>

              <div className="h-40 rounded-2xl bg-[#E4F2EC] border border-[#BCE0D1] p-4 flex flex-col items-center justify-center relative shadow-inner">
                <div className="w-12 h-12 rounded-2xl bg-[#2F8F6B] text-white font-black flex items-center justify-center text-xl shadow-md border border-[#1F6B4F]">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

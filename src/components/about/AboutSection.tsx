import AbcdTable from './AbcdTable';

export default function AboutSection() {
  return (
    <section
      className="relative text-white pt-12 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-[#342319]"
      style={{ backgroundColor: '#342319' }}
    >
      <div
        id="table"
        className="max-w-6xl mx-auto scroll-mt-24 relative z-10"
      >
        {/* Section Heading on Dirt/Rock Background */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5EFE6] tracking-tight drop-shadow-sm">
            The Invertible Island Cipher
          </h2>

          <p className="text-base sm:text-lg text-[#E8D5B5] leading-relaxed font-medium">
            Unlike one-way hashes or lossy transforms, this cipher is an invertible permutation. Each character navigates four discrete mechanical layers that map deterministically forward and backward without collision.
          </p>
        </div>

        {/* Explorer Cartography Parchment Table on Dirt */}
        <AbcdTable />
      </div>
    </section>
  );
}

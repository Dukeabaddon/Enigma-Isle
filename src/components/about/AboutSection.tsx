import AbcdTable from './AbcdTable';

export default function AboutSection() {
  return (
    <section
      className="relative text-white pt-12 pb-14 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-[#3c2820]"
      style={{
        backgroundColor: '#3c2820',
        backgroundImage: `radial-gradient(circle at 15% 25%, rgba(110, 75, 55, 0.35) 0%, transparent 35%),
                          radial-gradient(circle at 85% 75%, rgba(70, 45, 30, 0.4) 0%, transparent 40%),
                          radial-gradient(circle at 50% 50%, rgba(95, 65, 45, 0.25) 0%, transparent 60%),
                          radial-gradient(circle at 75% 20%, rgba(50, 30, 20, 0.35) 0%, transparent 30%),
                          radial-gradient(circle at 25% 80%, rgba(85, 55, 38, 0.3) 0%, transparent 40%)`,
      }}
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

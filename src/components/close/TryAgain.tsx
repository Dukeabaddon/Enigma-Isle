import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function TryAgain() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToWorkbench = () => {
    const el = document.getElementById('workbench');
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="decrypt-close-bridge" className="relative bg-[#EDF5F1] pt-8 sm:pt-10 pb-0 overflow-x-clip">
      <div className="relative z-10 max-w-xl mx-auto w-full px-4 sm:px-6 pb-6 sm:pb-8">
        <div className="relative w-full">
          <img
            src="/images/parchment-bridge-panel.webp"
            alt=""
            className="block w-full h-auto pointer-events-none select-none"
            width={2048}
            height={768}
            decoding="async"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 py-10 sm:px-12 sm:py-12 text-center">
            <h2 className="font-hand text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Ready to try?
            </h2>
            <p className="mt-2 text-sm text-ink-muted font-medium max-w-xs sm:max-w-sm">
              Encrypt or decrypt a message in the workbench.
            </p>
            <button
              type="button"
              onClick={scrollToWorkbench}
              className="mt-5 text-base font-hand font-bold text-decrypt-deep underline decoration-decrypt-deep/40 underline-offset-[6px] hover:decoration-decrypt-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-decrypt-deep cursor-pointer bg-transparent border-0 p-0 min-h-11 inline-flex items-center"
            >
              Try it now
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative z-0 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 leading-none bg-sand-seam-top"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-14 sm:h-20 bg-gradient-to-b from-[#EDF5F1] to-transparent"
          aria-hidden
        />
        <img
          src="/images/misty-pastel-horizon-layers.webp"
          alt=""
          className="relative z-0 block w-full min-w-full h-auto max-w-none object-cover object-bottom"
          width={2103}
          height={748}
          decoding="async"
        />
      </div>

      <div
        className="sand-seam-bridge relative z-[1] h-20 sm:h-28 md:h-32 shrink-0"
        aria-hidden
      />
    </section>
  );
}

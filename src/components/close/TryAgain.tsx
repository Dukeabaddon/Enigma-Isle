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
    <section id="decrypt-close-bridge" className="relative bg-[#EDF5F1] pb-0 overflow-x-clip">
      <div
        className="close-bridge-stage relative z-0 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 leading-none bg-sand-seam-top"
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

        {/* Mist → footer band; mobile ~40dvh holds parchment */}
        <div
          className="close-mist-divider sand-seam-bridge relative z-[1] shrink-0"
          aria-hidden
        />

        <div className="parchment-mist-overlay pointer-events-none absolute left-1/2 z-20">
          <div className="try-again-parchment-panel pointer-events-auto relative w-full">
            <img
              src="/images/parchment-bridge-panel.webp"
              alt=""
              className="block w-full h-auto pointer-events-none select-none"
              width={2048}
              height={768}
              decoding="async"
              aria-hidden
            />
            <div className="try-again-parchment-inner absolute flex flex-col items-center justify-center text-center">
              <h2 className="try-again-parchment-title font-display font-extrabold text-ink tracking-tight">
                Ready to try?
              </h2>
              <p className="try-again-parchment-body text-ink-muted font-medium leading-snug">
                Encrypt or decrypt a message in the workbench.
              </p>
              <button
                type="button"
                onClick={scrollToWorkbench}
                className="try-again-parchment-cta font-display font-extrabold text-decrypt-deep underline decoration-decrypt-deep/45 underline-offset-[7px] hover:decoration-decrypt-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-decrypt-deep cursor-pointer bg-transparent border-0 p-0 inline-flex items-center justify-center"
              >
                Try it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

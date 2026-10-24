/** Shared soil stack for About + cipher result (decorative). */
export default function UndergroundSoilBackdrop() {
  return (
    <div className="underground-soil-backdrop" aria-hidden>
      <div className="underground-soil-texture underground-soil-texture--a" />
      <div className="underground-soil-texture underground-soil-texture--b" />
      <div className="underground-soil-tint" />
    </div>
  );
}

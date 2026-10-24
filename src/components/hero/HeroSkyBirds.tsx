/** Decorative sky birds — pointer-events none, aria hidden */
export default function HeroSkyBirds() {
  return (
    <div className="hero-sky-birds" aria-hidden>
      <div className="bird-container bird-container-one">
        <div className="bird-wing bird-one" />
      </div>
      <div className="bird-container bird-container-two">
        <div className="bird-wing bird-two" />
      </div>
      <div className="bird-container bird-container-three">
        <div className="bird-wing bird-three" />
      </div>
      <div className="bird-container bird-container-four">
        <div className="bird-wing bird-four" />
      </div>
    </div>
  );
}

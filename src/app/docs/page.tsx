import { Navbar } from "../components";
import { HomeBlockTitle } from "../page";

export default function Page() {
  return (
    <div>
      <Navbar />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/beams.webp"
        width="100%"
        height="auto"
        alt="bg-image"
        className="absolute top-0"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="100%"
        height="100%"
        className="filter-svg-bg fixed top-0 left-0 opacity-10"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="9.5"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <HomeBlockTitle>Documentación Neo-WiFi App</HomeBlockTitle>
    </div>
  );
}

import { ReactNode } from "react";
import { Navbar, Hero, GeoPositionCard, Footer } from "./components/index";
// import AccordionList from "./components/FAQ/AccordionList";
import { DownloadCard } from "./components/DownloadCard/DownloadCard";

interface HomeBlockProps {
  children: ReactNode;
  className?: string;
}

const HomeBlock = ({ children, className }: HomeBlockProps) => {
  return (
    <section
      className={`max-w-3xl flex justify-center mx-auto my-28 ${className}`}
    >
      {children}
    </section>
  );
};

const HomeBlockTitle = ({ children }: { children: string }) => {
  return (
    <h1 className="md:text-[2.5rem] text-3xl font-semibold my-20 flex justify-center mx-auto">
      {children}
    </h1>
  );
};

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
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
      <HomeBlock>
        <Hero />
      </HomeBlock>

      <HomeBlockTitle>Información Geográfica</HomeBlockTitle>

      <HomeBlock>
        <span id="geoposition" />
        <GeoPositionCard />
      </HomeBlock>

      {/* <HomeBlockTitle>Descarga la App</HomeBlockTitle>

      <HomeBlock>
        <Main />
      </HomeBlock>

      <HomeBlock>
        <DownloadCard />
      </HomeBlock> */}

      {/* <HomeBlockTitle>Preguntas Frecuentes</HomeBlockTitle>
      <Faqs />

      <HomeBlock>
        <AccordionList />
      </HomeBlock> */}

      <HomeBlock>
        <DownloadCard />
      </HomeBlock>

      <Footer />
    </div>
  );
}

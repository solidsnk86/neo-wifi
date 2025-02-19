import { ReactNode } from "react";
import {
  Navbar,
  Hero,
  GeoPositionCard,
  Footer,
  Faqs,
} from "./components/index";
import AccordionList from "./components/FAQ/AccordionList";
import { DownloadCard } from "./components/DownloadCard/DownloadCard";
import { VisitsComponent } from "./components/VisitsComponent/Visits";

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
    <div className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <Navbar />

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

      <section className="overflow-hidden">
        <VisitsComponent />
      </section>

      <HomeBlock>
        <DownloadCard />
      </HomeBlock>

      <HomeBlockTitle>Preguntas Frecuentes</HomeBlockTitle>
      <Faqs />

      <HomeBlock>
        <AccordionList />
      </HomeBlock>

      <Footer />
    </div>
  );
}

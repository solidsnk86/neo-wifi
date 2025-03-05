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
import Image from "next/image";
import { Donation } from "./components/DonationCard/Donation";
import { YouTubeLiteVideo } from "./components//YoutubeVideo";
import { HomeBlock, HomeBlockTitle } from "./components/BlockComp";

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

      <Donation />

      <HomeBlock>
        <Image
          src="/assets/neo-wifi-app-card.png"
          width={400}
          height={300}
          alt="Neo-Wifi app image"
          className="rounded-[16px] img_card"
        />
      </HomeBlock>

      <HomeBlockTitle>Introducción</HomeBlockTitle>
      <HomeBlock>
        <p className="text-center">
          Este es un video introductorio y explicativo al uso de la aplicación.
        </p>
      </HomeBlock>
      <YouTubeLiteVideo
        videoId="7ZqQ-NsTzYA"
        width={400}
        height={300}
        className="rounded-xl flex justify-center mx-auto"
        border={0}
      />

      <section className="overflow-hidden my-24">
        <VisitsComponent />
      </section>

      <HomeBlockTitle>Descarga la app!</HomeBlockTitle>

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

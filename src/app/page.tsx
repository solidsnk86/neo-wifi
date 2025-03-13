"use client";

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
import { ArrowBigDownDash, Quote } from "lucide-react";
import MouseTrail from "./components/MouseTrail";

export default function Home() {
  return (
    <>
      <MouseTrail />
      <div className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
        <Navbar />
        <HomeBlock>
          <Hero />
        </HomeBlock>

        <HomeBlock className="flex justify-center mx-auto">
          <ArrowBigDownDash className="w-10 h-10 animate-bounce dark:text-[#90B45B] text-[#2B7097]" />
        </HomeBlock>

        <HomeBlockTitle>Información Geográfica</HomeBlockTitle>
        <HomeBlock>
          <p className="text-center text-pretty px-3 text-zinc-600 dark:text-zinc-400">
            Además de la red WiFi gratuita del Gobierno de la Provincia de San
            Luis, también hay disponibles 93 espacios WiFi gratuitos provistos
            en espacios públicos, instituciones educativas, clínicas y
            hospitales entre otros puntos importantes de la ciudad, por el
            Gobierno de la Provincia de Córdoba.
          </p>
        </HomeBlock>

        <HomeBlock>
          <span id="geoposition" />
          <GeoPositionCard />
        </HomeBlock>

        <Donation />

        <HomeBlock className="relative z-50">
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
          <p className="text-center text-zinc-600 dark:text-zinc-400 px-3">
            Este video es una introducción detallada al uso de la aplicación,
            donde voy a mostar sus principales funciones y cómo sacarle el
            máximo provecho. Vamos a ver que podés hacer con ella!
          </p>
        </HomeBlock>
        <YouTubeLiteVideo
          videoId="7ZqQ-NsTzYA"
          width={360}
          height={300}
          className="rounded-xl flex justify-center mx-auto"
          border={0}
        />

        <section className="overflow-hidden my-24">
          <VisitsComponent />
        </section>

        <HomeBlockTitle>Descarga la app!</HomeBlockTitle>

        <HomeBlock className="flex-col">
          <p className="text-center relative flex mx-auto justify-center font-semibold px-3 text-zinc-600 dark:text-zinc-400">
            <Quote className="rotate-180 text-zinc-300/70 dark:text-zinc-800 w-10 h-10 fill-[#2B7097] dark:fill-[#90B45B]" />
            Creo que todos merecen una conexión a Internet estable y segura.
            Ayúdame a desbloquear el poder de la conectividad y hacer realidad
            esta misión 😃.
            <Quote className=" text-zinc-300/70 dark:text-zinc-800 w-10 h-10 fill-[#2B7097] dark:fill-[#90B45B]" />
          </p>
          <DownloadCard />
        </HomeBlock>

        <HomeBlockTitle>Preguntas Frecuentes</HomeBlockTitle>
        <Faqs />

        <HomeBlock>
          <AccordionList />
        </HomeBlock>

        <Footer />
      </div>
    </>
  );
}

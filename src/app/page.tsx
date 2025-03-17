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
import { Quote } from "lucide-react";
import MouseTrail from "./components/MouseTrail";
import NewsletterForm from "./components/NewsLetterForm";

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
          <div className="flex flex-col">
            <span className="arrow text-zinc-500">desliza!</span>
            <Image
              src="/bucle-arrow.svg"
              width={90}
              height={90}
              alt=""
              className="text-yellow-300 rotate-[125deg] "
            />
          </div>
        </HomeBlock>

        <HomeBlockTitle>Información Geográfica</HomeBlockTitle>
        <HomeBlock>
          <p className="text-center text-pretty px-3 text-zinc-600 dark:text-zinc-400">
            Además de la red WiFi gratuita ofrecida por el Gobierno de la
            Provincia de San Luis, la Provincia de Córdoba también dispone de 93
            puntos de acceso gratuito a internet. Estos espacios WiFi están
            estratégicamente ubicados en lugares públicos, instituciones
            educativas, clínicas, hospitales y otros sitios clave de la ciudad,
            brindando conectividad a los ciudadanos de manera accesible y
            eficiente.
          </p>
        </HomeBlock>

        <HomeBlock className="px-3">
          <GeoPositionCard />
        </HomeBlock>

        <Donation />

        <HomeBlock className="relative z-50">
          <Image
            src="/assets/neo-wifi-app-card.png"
            width={400}
            height={300}
            alt="Neo-Wifi app image"
            className="rounded-[16px] img_card relative z-50"
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
          className="rounded-xl flex justify-center mx-auto relative"
          border={0}
        />

        <section className="overflow-hidden my-24">
          <VisitsComponent />
        </section>

        <HomeBlockTitle>Descarga la app!</HomeBlockTitle>

        <HomeBlock className="flex-col px-3">
          <div className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 z-50 backdrop-blur-xl">
            <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
              <p className="text-center relative flex mx-auto justify-center font-semibold px-3 text-zinc-600 dark:text-zinc-400">
                <Quote className="rotate-180 text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
                Creo que todos merecen una conexión a Internet estable y segura.
                Ayúdame a desbloquear el poder de la conectividad y hacer
                realidad esta misión 😃.
                <Quote className=" text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
              </p>
            </article>
          </div>
          <DownloadCard />
        </HomeBlock>

        <HomeBlockTitle>Preguntas Frecuentes</HomeBlockTitle>
        <Faqs />

        <HomeBlock className="px-3">
          <AccordionList />
        </HomeBlock>

        <h2 className="flex justify-center mx-auto text-2xl font-semibold px-3 text-pretty text-center z-50 font-['bogue-black']">
          Recibe las últimas novedades sobre Neo WiFi App 🚀
        </h2>

        <div className="px-3">
          <NewsletterForm />
          <Image
            src="/squirrel.svg"
            width={300}
            height={300}
            alt="Imagen de ardilla"
            className="flex justify-center mx-auto z-50 relative"
          />
        </div>

        <Footer />
      </div>
    </>
  );
}

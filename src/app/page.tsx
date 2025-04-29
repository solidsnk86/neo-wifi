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
import { HomeBlock, HomeBlockTitle } from "./components/BlockComp";
import { MousePointer2, Quote } from "lucide-react";
import MouseTrail from "./components/MouseTrail";
import NewsletterForm from "./components/NewsLetterForm";
import WifiLocationsCard from "./components/WifiLocationCard";
import { AiAssistant } from "./components/AiAssistant/AiAsistant";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickChat = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen) {
    return (
      <div className="sticky top-0 left-0 w-full h-screen">
        <AiAssistant closeAssistant={handleClickChat} />
      </div>
    );
  }

  return (
    <>
      <MouseTrail />
      <div className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
        <article className=""></article>
        <Navbar />
        <span className="effect-1" />
        <span className="effect-2" />
        {/* <div className="fixed top-14 left-0 h-[100dvh] inset-0 pointer-events-none z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full opacity-[0.06]"
            preserveAspectRatio="none"
          >
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="9.9"
                numOctaves="5"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div> */}

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

        <HomeBlockTitle>Características</HomeBlockTitle>
        <HomeBlock className="overflow-hidden px-3">
          <div className="flex p-6 rounded-[33px] border-y-2 border-l-2 border-zinc-200/70 dark:border-zinc-800 relative bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-lg">
            <span className="absolute -top-9 left-[50%] text-center w-56 -translate-x-[50%] p-3 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-3xl text-xl">
              Puntos WiFi cerca
            </span>
            <Image
              src="/neo-wifi-satellite.png"
              width={420}
              height={360}
              alt="Neo-Wifi map"
              quality={100}
              className="rounded-3xl -z-10"
            />
            <span className="absolute -bottom-12 -right-6 p-4 rounded-full border-2 border-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-800/90 backdrop-blur-sm z-50">
              <MousePointer2
                width={65}
                height={65}
                className="rotate-90 text-yellow-300"
              />
            </span>
          </div>
        </HomeBlock>

        <article className="flex flex-col justify-center mx-auto mb-24 text-center px-3">
          <HomeBlockTitle>
            Conecta a WiFi gratuito en San Luis y otras ciudades
          </HomeBlockTitle>
          <p className="text-center text-xl md:text-2xl mt-5">
            Obtené acceso a diferentes puntos wifi
          </p>
        </article>

        <section className="overflow-hidden">
          <p className="flex justify-center mx-auto text-center text-xl mt-6 bg-[#FFFFFF] dark:bg-zinc-800/50 w-fit p-3 rounded-t-xl backdrop-blur-xl relative z-50 cursor-default border-x-2 border-t-2 border-zinc-200/70 dark:border-zinc-800/50">
            Redes WiFi disponibles en las siguientes localidades
          </p>
          <WifiLocationsCard />
        </section>

        <section className="w-full bg-[#FFFFFF] dark:bg-zinc-950/30 z-50 relative py-10 border-t border-zinc-200/70 dark:border-zinc-800/50 backdrop-blur-sm">
          <HomeBlockTitle className="mt-16">Información WiFi</HomeBlockTitle>

          <HomeBlock className="px-3">
            <GeoPositionCard />
          </HomeBlock>

          <Donation content="¿Me ayudas a seguir creando soluciones?" />

          <HomeBlock>
            <Image
              src="/assets/neo-wifi-app-card.png"
              width={400}
              height={300}
              alt="Neo-Wifi app image"
              className="rounded-[16px] img_card relative z-50"
            />
          </HomeBlock>

          <section className="flex mx-auto px-3 max-w-3xl">
            <div className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 z-50 backdrop-blur-xl">
              <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
                <p className="relative flex text-center text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-400">
                  <Quote className="rotate-180 text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
                  Creo que el acceso a una conexión a Internet estable y segura
                  es un derecho para todos. Quiero ayudar a potenciar la
                  conectividad y hacer de esta misión una realidad. ¡Vamos por
                  ello! 😃
                  <Quote className=" text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
                </p>
                <aside className="flex justify-center items-center gap-3 mt-4">
                  <Image
                    src="/avatar-personal.jpg"
                    width={45}
                    height={45}
                    alt="Avatar Gabriel"
                    className="rounded-full border-2 border-[#4E4E4E] outline-[1px] outline-double outline-black"
                  />
                  <div className="flex flex-col font-semibold text-zinc-600">
                    <span>Gabriel, desarrollador</span>
                    <span>de Neo-WiFi</span>
                  </div>
                </aside>
              </article>
            </div>
          </section>
        </section>

        {/* <HomeBlockTitle>Introducción</HomeBlockTitle>
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
          className="rounded-xl flex justify-center mx-auto my-12 z-50 relative"
          border={0}
        /> */}

        <section className="overflow-hidden mb-24">
          <VisitsComponent />
        </section>

        <HomeBlockTitle>Descarga la app!</HomeBlockTitle>

        <HomeBlock>
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
          <Donation content="Y contribuye con el desarrollador." />
          <Image
            src="/squirrel.svg"
            width={300}
            height={300}
            alt="Imagen de ardilla"
            className="flex justify-center mx-auto z-50 relative"
          />
        </div>

        <div
          className="fixed bottom-4 right-2 px-3 z-50 neo-ai"
          id="neo-ai"
          onClick={handleClickChat}
        >
          <Image
            src="/assets/neo_pixelart-removebg-preview.png"
            width={45}
            height={45}
            alt="The Neo Protagonist"
          />
        </div>

        <Footer />
      </div>
    </>
  );
}

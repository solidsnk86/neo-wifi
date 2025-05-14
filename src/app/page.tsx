"use client";

import { Navbar, Hero, GeoPositionCard, Footer } from "./components/index";
import AccordionList from "./components/FAQ/AccordionList";
import { DownloadCard } from "./components/DownloadCard/DownloadCard";
import { VisitsComponent } from "./components/VisitsComponent/Visits";
import Image from "next/image";
import { Donation } from "./components/DonationCard/Donation";
import { HomeBlock, HomeBlockTitle } from "./components/BlockComp";
import { MousePointer2, Pause, Play, Quote } from "lucide-react";
import MouseTrail from "./components/MouseTrail";
import NewsletterForm from "./components/NewsLetterForm";
import WifiLocationsCard from "./components/WifiLocationCard";
import { AiAssistant } from "./components/AiAssistant/AiAsistant";
import { useEffect, useRef, useState } from "react";
import { pauseMarquee, playMarquee } from "./components/constants";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [historyChat, setHistoryChat] = useState<Message[]>([]);
  const pathSVGRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const localHistoryChat = localStorage.getItem("neo-wifi-chat");
    const parsed = JSON.parse(localHistoryChat as string);
    setHistoryChat(parsed);
  }, []);

  const handleClickChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClikStateBtn = () => {
    if (!isPaused) {
      pauseMarquee();
      setIsPaused(true);
    } else {
      playMarquee();
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  useEffect(() => {
    gsap.set(pathSVGRef.current, { visibility: "visible" });

    gsap.to(pathSVGRef.current, {
      drawSVG: "0% 100%",
      duration: 1,
      ease: "power4.inOut",
    });
  }, []);

  return (
    <>
      <MouseTrail />
      <div className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
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
            <svg
              aria-hidden="true"
              viewBox="0 0 144 141"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-yellow-300 rotate-[125deg] "
            >
              <path
                ref={pathSVGRef}
                d="M129.189 0.0490494C128.744 0.119441 126.422 0.377545 124.03 0.635648C114.719 1.6446 109.23 2.4893 108.058 3.09936C107.119 3.56864 106.674 4.34295 106.674 5.44576C106.674 6.71281 107.424 7.51058 109.043 7.97986C110.403 8.37875 110.825 8.42567 118.87 9.52847C121.778 9.92736 124.288 10.3028 124.475 10.3732C124.663 10.4436 122.951 11.1006 120.676 11.8749C110.028 15.4414 100.412 20.7677 91.7339 27.9242C88.38 30.7164 81.6957 37.4271 79.2096 40.5009C73.8387 47.2116 69.6874 54.8139 66.5681 63.7302C65.9348 65.4665 65.3484 66.8978 65.2546 66.8978C65.1374 66.8978 63.7771 66.7336 62.2291 66.5693C52.9649 65.5134 43.1847 68.1649 34.1316 74.2186C24.7735 80.46 18.5349 87.7338 10.5371 101.742C2.53943 115.726 -1.0959 127.482 0.287874 135.014C0.89767 138.463 2.0469 140.035 3.97011 140.082C5.28352 140.105 5.37733 139.659 4.20465 139.049C3.05541 138.463 2.6567 137.9 2.32835 136.281C0.616228 128.021 6.24512 113.028 17.4325 96.1104C23.2725 87.241 28.362 81.9147 35.5622 77.1046C43.8649 71.5437 52.7069 69.033 61.1737 69.8308C64.9967 70.1828 64.6917 69.9247 64.1992 72.4822C62.2525 82.5013 63.8005 92.6378 67.9753 97.354C73.1116 103.079 81.9771 102 85.0027 95.2657C86.3395 92.2858 86.3864 87.7103 85.1434 83.9796C83.1498 78.0901 80.007 73.8197 75.4335 70.8163C73.8152 69.7604 70.4848 68.1883 69.875 68.1883C69.359 68.1883 69.4294 67.6487 70.2268 65.3257C72.3377 59.2486 75.457 52.7021 78.4122 48.244C83.2436 40.9232 91.4524 32.5701 99.1687 27.103C105.806 22.4102 113.241 18.5386 120.512 16.0045C123.772 14.8548 129.87 13.1889 130.081 13.3766C130.128 13.447 129.541 14.362 128.791 15.4414C124.78 21.0258 122.716 26.0706 122.388 30.998C122.224 33.7198 122.341 34.588 122.88 34.2595C122.998 34.1891 123.678 32.969 124.405 31.5611C126.281 27.8069 131.722 20.6738 139.579 11.6402C141.127 9.85697 142.652 7.86254 143.027 7.08823C144.552 4.03792 143.52 1.48035 140.377 0.471397C139.439 0.166366 138.102 0.0490408 134.584 0.0255769C132.074 -0.021351 129.635 0.00212153 129.189 0.0490494ZM137.117 4.92955C137.187 5.0234 136.718 5.63346 136.061 6.29045L134.865 7.48712L131.042 6.73627C128.931 6.33739 126.727 5.9385 126.14 5.8681C124.827 5.68039 124.123 5.32843 124.968 5.28151C125.296 5.28151 126.868 5.11725 128.486 4.953C131.3 4.64797 136.812 4.62451 137.117 4.92955ZM71.5168 72.5292C76.2075 74.899 79.4441 78.8175 81.3204 84.355C83.6189 91.1361 81.2266 96.8378 76.0433 96.8847C73.3227 96.9082 70.9773 95.2188 69.5936 92.2389C68.2802 89.4232 67.6938 86.5606 67.5765 82.1259C67.4593 78.3248 67.6 76.4242 68.2333 72.7403L68.4912 71.2856L69.359 71.5906C69.8515 71.7548 70.8132 72.1772 71.5168 72.5292Z"
                stroke="#fde047"
                strokeWidth="2"
                fill="none"
              ></path>
            </svg>
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

        <section className="overflow-hidden relative">
          <p className="flex justify-center mx-auto text-center text-xl mt-6 bg-[#FFFFFF] dark:bg-zinc-950/50 w-fit p-3 md:rounded-t-xl backdrop-blur-xl relative z-50 cursor-default border-x-2 border-t-2 border-zinc-200/70 dark:border-zinc-900/50">
            Redes WiFi disponibles en las siguientes localidades
          </p>
          <button
            className="absolute right-2 md:top-8 top-1 bg-[#FFFFFF] dark:bg-zinc-950/50 p-2 rounded-full hover:brightness-125 backdrop-blur-lg z-50 border-2 border-zinc-200/70 dark:border-zinc-900/50"
            onClick={handleClikStateBtn}
          >
            {isPaused ? <Play /> : <Pause />}
          </button>
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
        {/* <section className="overflow-x-hidden w-full">
          <Faqs />
        </section> */}

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

        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-[100dvh] z-[9999]">
            <AiAssistant
              closeAssistant={handleClickChat}
              history={historyChat}
            />
          </div>
        )}
      </div>
    </>
  );
}

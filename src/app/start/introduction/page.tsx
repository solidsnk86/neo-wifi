"use client";

import { Footer, Navbar } from "@/app/components";
import { Donation } from "@/app/components/DonationCard/Donation";
import MouseTrail from "@/app/components/MouseTrail";
import { useLayoutEffect, useRef, useState } from "react";
import { AiAssistant } from "@/app/components/AiAssistant/AiAsistant";
import Image from "next/image";
import { YouTubeLiteVideo } from "@/app/components/YoutubeVideo";
import { DocsIntroduction } from "./components/DocsIntroduction";
import { Poppins } from "next/font/google";
import { HighlightTitle } from "./components/HighlightTitle";
import { FisrtStep } from "./components/FisrtStep";
import { SecondStep } from "./components/SecondStep";
import { ThirdStep } from "./components/ThirdStep";
import { FourthStep } from "./components/FourthStep";
import { FifthStep } from "./components/FiifhStep";
import { SixthStep } from "./components/SixthStep";
import { SeventhStep } from "./components/SeventhStep";
import { BackToTop } from "@/app/components/BackToTop";
import { DocsSidebar } from "./components/DocsSidebar";
import gsap from "gsap";

const poppins = Poppins({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleClickChat = () => {
    setIsOpen(!isOpen);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { visibility: "visible" });

      gsap.from(titleRef.current, {
        y: -80,
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200 ${poppins.className} min-h-screen`}
    >
      <MouseTrail />
      <Navbar />

      {/* Docs layout */}
      <div className="flex">
        <DocsSidebar />

        <main className="flex-1 min-w-0 px-1 md:px-5 lg:px-10 py-10 max-w-4xl mx-auto w-full">

          {/* Hero title */}
          <div className="px-4 pt-28 pb-6 text-center">
            <HighlightTitle
              ref={titleRef}
              beforeHighlight="¿Cómo"
              highlight="funciona?"
              afterHighlight="guía paso a paso"
              className="text-3xl md:text-5xl"
            />
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
              Guía completa para configurar tu dispositivo TP-Link con Neo-WiFi.
            </p>
          </div>

          {/* Introducción */}
          <section id="introduccion" className="scroll-mt-24">
            <DocsIntroduction />
          </section>

          {/* Primeros pasos */}
          <section id="primeros-pasos" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Primeros"
              highlight="pasos"
              afterHighlight="reseteo"
              className="my-8 text-2xl md:text-4xl"
            />
            <FisrtStep />
          </section>

          {/* Indicadores LED */}
          <section id="indicadores-led" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Indicadores"
              highlight="led"
              afterHighlight="router"
              className="my-8 text-2xl md:text-4xl"
            />
            <SecondStep />
          </section>

          {/* Descarga e instalación */}
          <section id="descarga-instalacion" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Descarga"
              highlight="Neo-WiFi"
              afterHighlight="e instalación"
              className="my-8 text-2xl md:text-4xl"
            />
            <ThirdStep />
          </section>

          {/* Primera ejecución */}
          <section id="primera-ejecucion" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Primera"
              highlight="ejecución"
              afterHighlight="Neo-WiFi"
              className="my-8 text-2xl md:text-4xl"
            />
            <FourthStep />
          </section>

          {/* Uso de coordenadas */}
          <section id="uso-coordenadas" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Uso de las"
              highlight="Coordenadas"
              afterHighlight=""
              className="my-8 text-2xl md:text-4xl"
            />
            <FifthStep />
          </section>

          {/* Geolocalización */}
          <section id="geolocalizacion" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Permitir"
              highlight="Geolocalización"
              afterHighlight=""
              className="my-8 text-2xl md:text-4xl"
            />
            <SixthStep />
          </section>

          {/* Coordenadas en la app */}
          <section id="coordenadas-app" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Uso"
              highlight="Coordenadas"
              afterHighlight="en la app"
              className="my-8 text-2xl md:text-4xl"
            />
            <SeventhStep />
          </section>

          {/* Video */}
          <section id="video" className="scroll-mt-24">
            <HighlightTitle
              beforeHighlight="Les dejo un"
              highlight="breve"
              afterHighlight="Vídeo"
              className="my-8 text-2xl md:text-4xl"
            />
            <YouTubeLiteVideo
              videoId="9t6QI3QCFUw"
              width={360}
              height={300}
              className="rounded-xl flex justify-center mx-auto my-12 z-50 relative"
              border={0}
            />
          </section>

          <div className="py-10">
            <Donation content="Si te ha sido de utilidad ésta herramienta!" />
          </div>
        </main>
      </div>

      <Footer />
      <BackToTop />
      <div className="neo-ai">
        <span
          className="fixed bottom-4 right-2 px-3 z-50 neo-ai"
          onClick={handleClickChat}
        >
          <Image
            src="/assets/neo_pixelart-removebg-preview.png"
            width={55}
            height={55}
            alt="The Neo Protagonist"
          />
        </span>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-[100dvh] z-[9999]">
          <AiAssistant closeAssistant={handleClickChat} />
        </div>
      )}
    </div>
  );
}

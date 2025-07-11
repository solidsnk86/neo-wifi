"use client";

import { Footer, Navbar } from "@/app/components";
import { Donation } from "@/app/components/DonationCard/Donation";
import MouseTrail from "@/app/components/MouseTrail";
import { useState } from "react";
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

const poppins = Poppins({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main
      className={`font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200 ${poppins.className}`}
    >
      <MouseTrail />
      <Navbar />
      <section className="px-4">
        <HighlightTitle beforeHighlight="Cómo" highlight="funciona" afterHighlight="guía paso a paso" className="pt-28 text-3xl md:text-5xl" />
        <DocsIntroduction />
        <HighlightTitle beforeHighlight="Primeros" highlight="pasos" afterHighlight="reseteo" className="my-8 text-2xl md:text-4xl" />
        <FisrtStep />
        <HighlightTitle beforeHighlight="Indicadores" highlight="led" afterHighlight="router" className="my-8 text-2xl md:text-4xl" />
        <SecondStep />
        <HighlightTitle beforeHighlight="Descarga" highlight="Neo-WiFi" afterHighlight="e instalación" className="my-8 text-2xl md:text-4xl" />
        <ThirdStep />
        <HighlightTitle beforeHighlight="Primera" highlight="ejecución" afterHighlight="Neo-WiFi" className="my-8 text-2xl md:text-4xl" />
        <FourthStep />
        <HighlightTitle beforeHighlight="Uso de las" highlight="Coordenadas" afterHighlight="" className="my-8 text-2xl md:text-4xl" />
        <FifthStep />
        <HighlightTitle beforeHighlight="Permitir" highlight="Geolocalización" afterHighlight="" className="my-8 text-2xl md:text-4xl" />
        <SixthStep />
        <HighlightTitle beforeHighlight="Uso" highlight="Coordenadas" afterHighlight="en la app" className="my-8 text-2xl md:text-4xl" />
        <SeventhStep />
        <HighlightTitle beforeHighlight="Les dejo un" highlight="breve" afterHighlight="Vídeo" className="my-8 text-2xl md:text-4xl" />
        <YouTubeLiteVideo
          videoId="9t6QI3QCFUw"
          width={360}
          height={300}
          className="rounded-xl flex justify-center mx-auto my-12 z-50 relative"
          border={0}
        />
      </section>

      <div className="neo-ai">
        <span
          className="fixed bottom-4 right-2 px-3 z-50"
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

      <section className="py-16">
        <Donation content="Si te ha sido de utilidad ésta herrmanienta!" />
      </section>
      <Footer />
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-[100dvh] z-[9999]">
          <AiAssistant closeAssistant={handleClickChat} />
        </div>
      )}
    </main>
  );
}

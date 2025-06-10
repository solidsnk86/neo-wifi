"use client";

import { Footer, Navbar } from "@/app/components";
import { HomeBlock, HomeBlockTitle } from "@/app/components/BlockComp";
import { Donation } from "@/app/components/DonationCard/Donation";
import MouseTrail from "@/app/components/MouseTrail";
import { dialogMap } from "./constants";
import { StepCard } from "./components/StepCard";
import { useState } from "react";
import { AiAssistant } from "@/app/components/AiAssistant/AiAsistant";
import Image from "next/image";
import { YouTubeLiteVideo } from "@/app/components/YoutubeVideo";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <MouseTrail />
      <Navbar />
      <section className="px-8">
        <HomeBlockTitle className="pt-24 z-50">Introducción</HomeBlockTitle>
        <HomeBlock className="flex-col text-pretty space-y-3 text-center z-50 relative">
          <p>
            Bienvenido a esta aplicación de configuración automatizada para
            dispositivos TP-Link.
          </p>
          <p>
            Esta herramienta de escritorio ha sido diseñada para simplificar y
            agilizar la configuración de CPE inalámbricos y routers de la marca
            TP-Link, permitiendo a los usuarios optimizar sus dispositivos de
            red con solo unos clics.
          </p>
          <p>
            Con una interfaz intuitiva y funcionalidades avanzadas, la
            aplicación elimina la necesidad de configuraciones manuales
            complejas, reduciendo errores y mejorando la eficiencia en la
            instalación. Ya sea para despliegues individuales o configuraciones
            masivas, esta solución ofrece una manera rápida, segura y eficaz de
            ajustar los parámetros esenciales de los dispositivos, garantizando
            una conectividad estable y optimizada. Cabe destacar que la posición
            de la antena (CPE) debe ser ajustada por el mismo usuario.
          </p>
        </HomeBlock>

        <HomeBlockTitle>Primeros Pasos</HomeBlockTitle>
        <HomeBlock className="flex-col z-50 relative space-y-6">
          {dialogMap.map((item, index) => (
            <StepCard
              key={index}
              paragraph={item.paragraph}
              url={item.url}
              info={item.info}
            />
          ))}
        </HomeBlock>

        <HomeBlockTitle>Un video breve</HomeBlockTitle>
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

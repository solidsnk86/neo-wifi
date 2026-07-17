"use client";

import { ArrowRight } from "lucide-react";
import styles from "./styles/hero.module.css";
import Link from "next/link";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

export const Hero = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const splitText = new SplitText(textRef.current, { type: "lines, words" });
    gsap.from(splitText.words, {
      duration: 0.3,
      y: 50,
      opacity: 0,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="w-full grid justify-left mt-10">
      <div>
        <div className="relative inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white z-0 px-3 py-1.5">
          <div className="shine absolute inset-0 rounded-[inherit] pointer-events-none" />
          <span className="relative z-10 text-black text-xs">
            Nuevas antenas agregadas en Jun 2026
          </span>
        </div>
      </div>
      <div>
        <h1 className={`text-left text-pretty ${styles.h1} dark:text-zinc-100`}>
          Configura tu dispositivo CPE WiFi con facilidad
        </h1>
        <div className="text-neutral-600 dark:text-neutral-400 max-w-[634px] text-lg md:text-xl">
          <p
            ref={textRef}
            className="py-8 text-pretty text-lg md:text-xl font-medium md:text-[17px] text-left text-zinc-600 dark:text-zinc-400 md:leading-7 antialiased"
          >
            Automatiza la configuración de tu TP-Link CPE y conéctate a la red
            WiFi del Gobierno de San Luis en minutos, optimizando el proceso de
            instalación.
          </p>
        </div>
      </div>
      <aside className="flex justify-left gap-10 relative z-50">
        <Link
          href="/start/introduction"
          className="flex justify-center items-center py-3 px-4 text-sm md:text-base rounded-full text-white font-medium dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 cursor-pointer hover:opacity-80"
        >
          Aprende más
        </Link>
        <Link
          href="/download"
          className={`flex justify-center items-center py-3 px-4 text-sm md:text-base bg-[#facc15] text-black font-medium cursor-pointer gap-2 group rounded-full hover:border-[#eafe7c] dark:hover:opacity-80 relative`}
        >
          Comenzar
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </aside>
    </div>
  );
};

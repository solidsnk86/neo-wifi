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
    <div className="w-full px-4 mx-auto justify-center pt-16 md:pt-8">
      <div>
        <h1
          className={`text-center text-pretty ${styles.h1} dark:text-zinc-100`}
        >
          Configura tu CPE WiFi en
          <span className={`${styles.h1} relative ml-2 dark:text-zinc-100`}>
            segundos
            <svg
              width="294"
              height="8"
              viewBox="0 0 294 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-[6px] left-[4px] text-[--color-yellow-primary] w-48 md:w-[294px]"
            >
              <path
                d={`M2 6C21.2566 4.1224 68.616 0.784449 294 2.45343`}
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <div>
          <p
            ref={textRef}
            className="py-20 text-pretty text-base md:text-lg text-center text-zinc-600 dark:text-zinc-400 antialiased"
          >
            Simplifica la conexión a las redes WiFi del Gobierno de San Luis con
            esta herramienta especializada. Configura tu dispositivo TP-LINK CPE
            de forma rápida, segura y automatizada, garantizando una
            conectividad óptima a la red provincial.
          </p>
        </div>
      </div>
      <aside className="flex justify-center gap-10 relative z-50">
        <Link
          href="/start/introduction"
          className="py-3 px-4 border border-zinc-300/70 dark:border-zinc-800 rounded-full text-white dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 cursor-pointer hover:opacity-80"
        >
          Aprende más
        </Link>
        <Link
          href="/download"
          className={`py-3 px-4 backdrop-blur-xl cursor-pointer flex items-center gap-2 group border border-zinc-300/70 dark:border-zinc-800 rounded-full hover:border-[--color-yellow-primary] dark:hover:border-[--color-yellow-primary] relative`}
        >
          Comenzar
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </aside>
    </div>
  );
};

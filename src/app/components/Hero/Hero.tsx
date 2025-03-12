import { ArrowRight } from "lucide-react";
import styles from "./styles/hero.module.css";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="w-full px-4 mx-auto justify-center pt-20 md:pt-14">
      <div>
        <h1
          className={`text-center text-pretty ${styles.h1} 
          dark:bg-gradient-to-br dark:from-[#a7c957] dark:via-[#6a994e] dark:to-[#386641] 
          bg-gradient-to-br from-[#01497c] via-[#2a6f97] to-[#61a5c2] transition-colors duration-300`}
        >
          Configura tu CPE WiFi en
          <span
            className={`${styles.h1} relative ml-2 dark:bg-gradient-to-br dark:from-[#a7c957] dark:via-[#6a994e] dark:to-[#386641] 
            bg-gradient-to-br from-[#01497c] via-[#2a6f97] to-[#61a5c2]`}
          >
            segundos
            <svg
              width="266"
              height="8"
              viewBox="0 0 284 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-[6px] left-[2px] text-[#2a6f97] dark:text-[#6a994e] w-48 md:w-[284px]"
            >
              <path
                d="M2 6C21.2566 4.1224 68.616 0.784449 284 2.45343"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="py-20 text-pretty text-center text-zinc-600 dark:text-zinc-400">
          Simplifica la conexión a las redes WiFi del Gobierno de San Luis con
          esta herramienta especializada. Configura tu dispositivo TP-LINK CPE
          de forma rápida y segura, garantizando una conectividad óptima a la
          red provincial.
        </p>
      </div>
      <aside className="flex justify-center gap-10 relative">
        <Link
          href="/start/introduction"
          className="py-3 px-4 border border-zinc-300/70 dark:border-zinc-800 rounded-full text-white dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 cursor-pointer hover:opacity-80"
        >
          Aprende más
        </Link>
        <Link
          href="/download"
          className="py-3 px-4 cursor-pointer flex items-center gap-2 group border border-zinc-300/70 dark:border-zinc-800 rounded-full hover:border-[#2a6f97] dark:hover:border-[#6a994e]"
        >
          Comenzar
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </aside>
    </div>
  );
};

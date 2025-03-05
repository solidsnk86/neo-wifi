import { ArrowRight } from "lucide-react";
import styles from "./styles/hero.module.css";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="w-full px-4 mx-auto justify-center pt-12">
      <div>
        <h1
          className={`text-center text-pretty ${styles.h1} 
          dark:bg-gradient-to-br dark:from-[#a7c957] dark:via-[#6a994e] dark:to-[#386641] 
          bg-gradient-to-br from-[#01497c] via-[#2a6f97] to-[#61a5c2] transition-colors duration-300`}
        >
          Configura tu CPE WiFi en segundos
        </h1>
        <p className="my-14 text-pretty text-center text-zinc-600 dark:text-zinc-400">
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
          Aprender más
        </Link>
        <Link
          href="/download"
          className="py-3 px-4 cursor-pointer flex items-center gap-2 group"
        >
          Comenzar
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </aside>
    </div>
  );
};

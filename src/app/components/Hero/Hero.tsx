// import { ArrowRight } from "lucide-react";
import { ArrowBigDownDash } from "lucide-react";
import styles from "./styles/hero.module.css";
// import Link from "next/link";

export const Hero = () => {
  return (
    <div className="w-full px-4 mx-auto justify-center">
      <div>
        <h1 className={`text-center text-pretty ${styles.h1}`}>
          Configura tu CPE WiFi en segundos
        </h1>
        <p className="my-14 text-pretty text-center text-gray-600">
          Simplifica la conexión a las redes WiFi del Gobierno de San Luis con
          esta herramienta especializada. Configura tu dispositivo TP-LINK CPE
          de forma rápida y segura, garantizando una conectividad óptima a la
          red provincial.
        </p>
      </div>
      <aside className="flex justify-center mx-auto mt-24 mb-2">
        <ArrowBigDownDash className="w-8 h-8 animate-bounce text-[#90B45B]" />
      </aside>
      {/* <aside className="flex justify-center gap-10 relative">
        <Link
          href="/start/introduction"
          className="py-3 px-4 border bg-gradient-to-b from-blue-400/10 to-slate-500/10 border-slate-800 rounded-lg cursor-pointer hover:brightness-125"
        >
          Aprender más
        </Link>
        <Link
          href="/start"
          className="py-3 px-4 border border-slate-800 rounded-lg cursor-pointer flex items-center gap-2 group hover:opacity-70"
        >
          Comenzar
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </aside> */}
    </div>
  );
};

import { ArrowRight } from "lucide-react";
import styles from "./styles/hero.module.css";

export const Hero = () => {
  return (
    <div className="w-full px-4 mx-auto justify-center">
      <div>
        <h1 className={`text-center text-pretty ${styles.h1}`}>
          Configura tu CPE WiFi en segundos
        </h1>
        <p className="my-6 text-pretty text-center text-gray-400">
          Simplifica la conexión a las redes WiFi del Gobierno de San Luis con
          esta herramienta especializada. Configura tu dispositivo CPE de forma
          rápida y segura, garantizando una conectividad óptima a la red
          provincial.
        </p>
      </div>
      <aside className="flex justify-center gap-10 relative">
        <button className="py-3 px-4 border bg-gradient-to-b from-blue-400/10 to-slate-500/10 border-slate-800 rounded-lg cursor-pointer hover:brightness-125">
          Ver Demo
        </button>
        <button className="py-3 px-4 cursor-pointer flex items-center gap-2 group">
          Comenzar
          <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </aside>
    </div>
  );
};

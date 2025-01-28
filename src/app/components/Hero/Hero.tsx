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
      <aside className="flex justify-center gap-10">
        <button className="py-1 px-2 border border-slate-800 rounded-lg cursor-pointer">
          Ver Demo
        </button>
        <button className="py-1 px-2 border border-slate-800 rounded-lg cursor-pointer">
          Comenzar
        </button>
      </aside>
    </div>
  );
};

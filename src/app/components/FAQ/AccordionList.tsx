"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const accordionLists = [
  {
    id: 1,
    question: "¿Qué es Neo-Wifi?",
    answer:
      "Neo-Wifi es una aplicación para poder ver información precisa sobre las antenas del Gobierno de la provincia de San Luis. Permite a los usuarios localizar y obtener detalles técnicos de las antenas wifi públicas de la provincia.",
  },
  {
    id: 2,
    question: "¿Cuánto cuesta el servicio de la aplicación?",
    answer:
      "El costo de la aplicación por reconfiguración sin reseteo de la antena es gratis.",
  },
  {
    id: 3,
    question: "¿Cómo puedo usar la aplicación?",
    answer:
      "Para usar Neo-Wifi, simplemente descarga la aplicación proporcionada en esta web, crea una cuenta y comienza a explorar el mapa de antenas. La interfaz es intuitiva y fácil de usar.",
  },
  {
    id: 4,
    question: "¿Qué información puedo encontrar sobre las antenas?",
    answer:
      "Podrás ver la ubicación exacta, potencia de señal, radio de cobertura, estado operativo y detalles técnicos específicos de cada antena.",
  },
  {
    id: 5,
    question: "¿La aplicación funciona en toda la provincia?",
    answer:
      "No por ahora tiene cobertura en la zona norte de la provincia, Neo-Wifi no cubre toda la provincia de San Luis. El servicio está disponible en las siguientes zonas urbanas: Concarán, Santa Rosa, Tilisarao, Villa Larca, Cortaderas, Los Molles, Carpintería y Cerro de Oro.",
  },
  {
    id: 6,
    question: "¿Necesito conexión a internet para usar la aplicación?",
    answer:
      "No requiere conexión a internet para poder configurar. Sin embargo, la aplicación requiere de tu posición geográfica (latitud y longitud). Puedes copiar y pegar los valores mencionados más arriba.",
  },
];

export const AccordionList = () => {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const toggle = (id: number) => {
    setActiveItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <article className="flex flex-col justify-center mx-auto mt-8 space-y-4 px-4 relative">
      {accordionLists.map((list) => (
        <div
          key={list.id}
          className="border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 rounded-lg overflow-hidden shadow-sm"
        >
          <header
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-slate-800/50 transition-colors duration-150"
            onClick={() => toggle(list.id)}
          >
            <h3 className="text-lg font-semibold">{list.question}</h3>
            <ChevronDown
              className={`transform transition-transform duration-200 text-gray-100 ${
                activeItems.includes(list.id) ? "rotate-180" : ""
              }`}
            />
          </header>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              activeItems.includes(list.id) ? "max-h-48" : "max-h-0"
            }`}
          >
            <p className="p-4 text-gray-400 border-t border-slate-800">
              {list.answer}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default AccordionList;

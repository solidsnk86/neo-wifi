"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const accordionLists = [
  {
    id: 1,
    question: "¿Qué es Neo-Wifi?",
    answer:
      "Neo-Wifi es una aplicación diseñada para configurar automáticamente las antenas CPE (TP-Link) en los nodos del Gobierno de la provincia de San Luis. Además, permite a los usuarios localizar las antenas WiFi públicas más cercanas a su domicilio y acceder a información técnica detallada, facilitando una conexión más rápida y eficiente.",
  },
  {
    id: 2,
    question: "¿Cuánto cuesta el servicio de la aplicación?",
    answer:
      "El costo de la aplicación es gratis, Si te ha sido de utilidad puedes colaborar con el desarrollador 💖.",
  },
  {
    id: 3,
    question: "¿Cómo puedo usar la aplicación?",
    answer:
      "Para usar Neo-Wifi, solo necesitas descargar la aplicación desde esta web, instalarla en tu ordenador y ¡listo! Su interfaz intuitiva facilita la configuración. Recuerda ingresar las coordenadas obtenidas en esta web, siempre que hayas permitido la localización en tu navegador. Para más detalles, consulta la documentación o mira el tutorial disponible.",
  },
  {
    id: 4,
    question: "¿Qué información puedo encontrar sobre las antenas?",
    answer:
      "Podrás ver la ubicación exacta basada en las coordenadas, a que distancia en metros te encuentras de la antena más cercana y detalles técnicos específicos de cada antena.",
  },
  {
    id: 5,
    question: "¿Dónde funciona la aplicación web?",
    answer: `Actualmente, la cobertura de Neo-Wifi-Web está disponible en Mendoza, San Luis, San Juan, Córdoba, Buenos Aires, Corrientes y otros lugares internacionales dónde podrás obtener tu punto WiFi gratuito más cercano.`,
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
    <article className="flex flex-col justify-center mx-auto mt-16 space-y-4 rounded-xl relative backdrop-blur-xl z-50">
      {accordionLists.map((list) => (
        <div
          key={list.id}
          className="border border-zinc-300/70 dark:border-zinc-800 bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 rounded-lg overflow-hidden shadow-sm"
        >
          <header
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-zinc-300/30 dark:hover:bg-zinc-800/50 transition-colors duration-150"
            onClick={() => toggle(list.id)}
          >
            <h3 className="text-lg font-semibold">{list.question}</h3>
            <ChevronDown
              className={`transform transition-transform duration-200 text-zinc-600 dark:text-zinc-200 ${
                activeItems.includes(list.id) ? "rotate-180" : ""
              }`}
            />
          </header>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              activeItems.includes(list.id)
                ? "max-h-48 overflow-y-auto"
                : "max-h-0"
            }`}
          >
            <p className="p-4 text-zinc-700 dark:text-zinc-300 border-t border-zinc-300/70 dark:border-zinc-700/50">
              {list.answer}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default AccordionList;

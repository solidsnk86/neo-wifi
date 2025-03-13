"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const accordionLists = [
  {
    id: 1,
    question: "¿Qué es Neo-Wifi?",
    answer:
      "Neo-Wifi es una aplicación para poder ver información precisa sobre las antenas del Gobierno de la provincia de San Luis. Permite a los usuarios localizar y obtener detalles técnicos de las antenas wifi públicas de la provincia y cual es la más próxima a su domicilio.",
  },
  {
    id: 2,
    question: "¿Cuánto cuesta el servicio de la aplicación?",
    answer:
      "El costo de la aplicación es gratis, tiene un período de prueba de 30 días.",
  },
  {
    id: 3,
    question: "¿Cómo puedo usar la aplicación?",
    answer:
      "Para usar Neo-Wifi, simplemente descarga la aplicación proporcionada en esta web, instala la app en tu ordenador y listo!. La interfaz es intuitiva y fácil de usar. Recuerda que hay que insertar las coordenadas obtenidas de esta web siempre y cuando permitas la localización en tu navegador.",
  },
  {
    id: 4,
    question: "¿Qué información puedo encontrar sobre las antenas?",
    answer:
      "Podrás ver la ubicación exacta basada en las coordenadas, a que distancia en metros te encuentras de la antena más cercana y detalles técnicos específicos de cada antena.",
  },
  {
    id: 5,
    question: "¿La aplicación funciona en toda la provincia?",
    answer: `Neo-Wifi no cubre toda la provincia de San Luis por ahora. El servicio está disponible en las siguientes zonas urbanas: 
      San Luis, La Punta, Juana Koslay, El Trapiche, La Florida, Potrero de los Funes, Merlo, Concarán, Santa Rosa, Tilisarao, Villa Larca, 
      Cortaderas, Los Molles, Carpintería, Cerro de Oro, Quines, San Francisco del Monte de Oro, La Toma, Naschel, Alto Pelado, Alto Pencoso, 
      Arizona, Anchorena, Buena Esperanza, Unión.`,
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
    <article className="flex flex-col justify-center mx-auto mt-16 space-y-4 px-4 relative backdrop-blur-lg z-50">
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

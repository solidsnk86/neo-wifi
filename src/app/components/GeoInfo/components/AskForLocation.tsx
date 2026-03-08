import { showDialog } from "@/utils/dialog";
import { BadgeInfo, LocateFixed } from "lucide-react";
import Image from "next/image";
import { AskForLocationProps } from "./types/definitions";

export const AskForLocation = ({ handler }: AskForLocationProps) => {
  const timerWorker = new Worker(new URL("../timerWorker.ts", import.meta.url));

  timerWorker.postMessage(0);

  timerWorker.onmessage = (event) => {
    const timer = event.data;

    if (timer === 6) {
      timerWorker.terminate();
      return showDialog({
        content: (
          <article className="shadow-md">
            <div className="border-b-[6px] border-zinc-300 dark:border-zinc-950 rounded-xl p-3">
              <h2 className="text-2xl font-semibold flex justify-center mx-auto items-center gap-3">
                <BadgeInfo className="text-blue-500" />
                Información
              </h2>
              <p className="my-3 text-pretty font-sans text-zinc-600 dark:text-zinc-400">
                Si deseas conocer tu ubicación y obtener información sobre las
                antenas 📡 WiFi más cercanas, puedes habilitar la
                geolocalización de tu dispositivo. Así podrás ver detalles
                adicionales y descubrir a qué distancia te encuentras de la más
                próxima. ¡Actívala para más precisión!
              </p>
              <div className="relative w-fit justify-center mx-auto group">
                <Image
                  id="felix"
                  src={"/assets/felix.png"}
                  className="absolute -top-1 -left-[42px] hidden group-hover:flex felix"
                  width={55}
                  height={55}
                  alt="FelixTheCat86"
                />
                <button
                  className="flex mx-auto w-fit gap-1 items-center justify-center p-3 bg-gradient-to-b from-blue-500 to-blue-600 text-zinc-50 rounded-md border border-zinc-300/70 dark:border-zinc-500/50 backdrop-blur-xl transition-transform"
                  onClick={handler}
                  onMouseEnter={() => {
                    const felix = document.getElementById("felix");
                    if (felix) felix.style.animation = "sliderIn 0.6s ease-out";
                  }}
                  onMouseLeave={() => {
                    const felix = document.getElementById("felix");
                    if (felix)
                      felix.style.animation = "sliderOut 0.6s ease-out";
                  }}
                >
                  <LocateFixed className="text-red-500" />
                  Obtener Ubicación
                </button>
              </div>
            </div>
          </article>
        ),
      });
    }
  };

  return () => {
    timerWorker.terminate();
  };
};

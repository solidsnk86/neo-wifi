import { showDialog } from "@/utils/dialog";
import html2canvas from "html2canvas";
import { BadgeInfo } from "lucide-react";

export const mapSharer = (setIsLoading: (value: boolean) => boolean) => {
  const mapContainer = document.getElementById("map-container");
  setIsLoading(true);
  if (!mapContainer) {
    setIsLoading(false);
    showDialog({
      content: (
        <article className="shadow-md">
          <div className="border-b-[6px] border-zinc-300 dark:border-zinc-950 rounded-xl p-3">
            <h2 className="text-2xl font-semibold flex justify-center mx-auto items-center gap-3">
              <BadgeInfo className="text-red-500" />
              Información
            </h2>
            <p className="my-3 text-pretty font-thin">
              Debe permitir la geolocaclización para poder capturar la imagen
              del mapa y compartir! 😉
            </p>
          </div>
        </article>
      ),
    });
    return;
  }

  html2canvas(mapContainer, {
    useCORS: true,
    allowTaint: true,
    logging: true,
  }).then((canvas) => {
    canvas.toBlob(async (blob) => {
      const file = new File([blob!], "antena_mas_proxima_neo-wifi.png", {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          setIsLoading(false);
          await navigator.share({
            title: "Mi ubicación de antenas!",
            text: `Hola éstas son las antenas más próximas a mi disposición.`,
            files: [file],
          });
        } catch (error) {
          setIsLoading(false);
          console.error(error);
        }
      } else {
        setIsLoading(false);
        showDialog({
          content: (
            <div className="p-5">
              <p>Tu navegador no soporta compartir archivos!</p>
            </div>
          ),
        });
      }
    });
  });
};

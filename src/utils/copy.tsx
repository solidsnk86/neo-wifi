import { MapPinCheck, MapPinOff } from "lucide-react";
import { showDialog } from "./dialog";

export const copy = async (coord: string, title: string): Promise<boolean> => {
  try {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = coord;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }

    if (!coord || coord === "0") {
      showDialog({
        content: (
          <div className="p-6 flex flex-col items-center justify-center">
            <h2 className="flex gap-2 items-center text-2xl font-semibold">
              <MapPinOff className="w-6 h-6 text-red-500" /> Sin Localización
            </h2>
            <p className="my-3">
              Activa la geolocalización para poder copiar las coordenadas!
            </p>
          </div>
        ),
      });
      return false;
    }

    await navigator.clipboard.writeText(coord);
    showDialog({
      content: (
        <div className="p-6 flex flex-col items-center justify-center">
          <h2 className="flex gap-2 items-center text-2xl font-semibold">
            <MapPinCheck className="w-6 h-6 text-green-500" /> Copiado!
          </h2>
          <p className="my-3">
            Se ha copiado la coordenada para {title}: <span>{coord}</span>
          </p>
        </div>
      ),
    });
    return true;
  } catch (error) {
    console.error("Error al copiar:", error);
    return false;
  }
};

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

    await navigator.clipboard.writeText(coord);
    showDialog({
      content: (
        <div className="p-6 flex flex-col items-center justify-center">
          <p>
            📌 Se ha copiado la coordenada para {title}:<span>{coord}</span>
          </p>
          <p>Podés emplearla en la aplicación ahora!</p>
        </div>
      ),
    });
    return true;
  } catch (error) {
    console.error("Error al copiar:", error);
    return false;
  }
};

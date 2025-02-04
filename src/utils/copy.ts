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
      content: `
      <p>📌 Se ha copiado la coordenada para <span>${title}: ${coord}</span></p>
      <p>Podés emplearla en la aplicación ahora!</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Error al copiar:", error);
    return false;
  }
};

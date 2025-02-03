import { showDialog } from "./dialog";

export const copy = async (content: string): Promise<boolean> => {
  try {
    if (!navigator.clipboard) {
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    }

    await navigator.clipboard.writeText(content);
    showDialog({
      content: `Se ha copiado tú coordenada ${content}`,
    });
    return true;
  } catch (error) {
    console.error("Error al copiar:", error);
    return false;
  }
};

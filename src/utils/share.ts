import { toast } from "react-toastify";

const typeOfWindow =
  typeof window !== "undefined" ? window.location.href : location.href;
const description =
  "Obtiene información de tu WiFi 📡 más cercano y a que distancia te encuentras con ésta aplicación y configura de manera automatizada cualquier dispositivo inlámbrico TP-LINK CPE con la app de escritorio ";

export const share = {
  navigatorShare: () => {
    navigator.share({
      title: document.title,
      text: "Configura tu WiFi de manera automatizada en segundos con esta aplicación! 🚀",
      url: typeOfWindow,
    });
  },
  copy: async () => {
    const link = typeOfWindow;
    await navigator.clipboard.writeText(link);
    toast.success("Se ha copiado el Link!", {
      pauseOnHover: true,
      containerId: "top-toast",
    });
  },
  facebook: () => {
    const encodeUrl = encodeURIComponent(typeOfWindow);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`);
  },
  x: () => {
    const url = encodeURIComponent(typeOfWindow);
    const text = encodeURIComponent(description);
    const hashtags = encodeURIComponent("WiFi,Configuración,Automatización");
    window.open(
      `https://twitter.com/share?url=${url}&text=${text}&hashtags=${hashtags}`
    );
  },
  linkedIn: () => {
    const url = encodeURIComponent(typeOfWindow);
    const title = encodeURIComponent(document.title);
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
    window.open(shareUrl, "_blank");
  },
  whatsApp: () => {
    const url = typeOfWindow;
    const message = `${description} en ésta web: \n${url}`;
    const encodeMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodeMessage}`);
  },
  instagram: () => {
    window.open(`https://www.instagram.com/direct/new/`, "_blank");
  },
};

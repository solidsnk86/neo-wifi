"use client";

import { showDeliciusToast } from "./delicius-toast";

const typeOfWindow = typeof window !== "undefined" ? window.location.href : "";
const description =
  "Utiliza esta aplicación para obtener información detallada sobre la red WiFi 📡 más cercana, incluyendo la distancia a la que te encuentras. Configura automáticamente cualquier dispositivo inalámbrico TP-LINK PHAROS utilizando la aplicación de escritorio.";

export const share = {
  navigatorShare: () => {
    navigator.share({
      title: document.title,
      text: "Configura tu WiFi de manera automatizada en segundos con esta aplicación! 🚀",
      url: typeOfWindow,
    });
  },
  copyUrl: async () => {
    const link = typeOfWindow;
    await navigator.clipboard.writeText(link);
    showDeliciusToast({
      content: (
        <div className="p-5">
          <p>
            Se ha copiado el link: <span className="text-blue-400">{link}</span>
          </p>
        </div>
      ),
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

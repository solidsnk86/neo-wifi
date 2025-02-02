export const share = () => {
  if ("share" in navigator) {
    navigator.share({
      title: document.title,
      text: "Configura tu WiFi de manera automatizada en segundos con esta aplicación! 🚀",
      url: typeof window !== "undefined" ? window.location.href : location.href,
    });
  } else {
    throw new Error(`Navigartor doesn't support share`);
  }
};

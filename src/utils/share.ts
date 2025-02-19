const sharer = () =>
  navigator.share({
    title: document.title,
    text: "Configura tu WiFi de manera automatizada en segundos con esta aplicación! 🚀",
    url: typeof window !== "undefined" ? window.location.href : location.href,
  });

export const share = () => {
  if ("share" in navigator) {
    sharer();
  } else {
    throw new Error(`Navigartor doesn't support share`);
  }
};

onmessage = async (e) => {
  const blob = e.data;

  const file = new File([blob], "antena_mas_proxima_neo-wifi.png", {
    type: "image/png",
  });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: "Mi ubicación de antenas!",
        text: "Hola, estas son las antenas más próximas a mi disposición.",
        files: [file],
      });
      postMessage("done");
    } catch (error) {
      console.error(error);
      postMessage("error");
    }
  } else {
    postMessage("error");
  }
};

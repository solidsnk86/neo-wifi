export const screenShoot = async () => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaDevice: "screen" },
    });

    const video = document.createElement("video");
    video.srcObject = stream;
    await video.play();

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Detener el stream (opcional)
    stream.getTracks().forEach((track) => track.stop());

    // Convertir a imagen
    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgURL;
    link.download = "captura.png";
    link.click();
  } catch (err) {
    console.error("Error al capturar la pantalla:", err);
  }
};

export const mapSharer = (
  setIsLoading: (value: boolean) => boolean,
  content: string,
) => {
  setIsLoading(true);

  try {
    setIsLoading(false);
    document.body.click();
    navigator.share({
      title: "Mi ubicación de antenas!",
      text: `Hola éstas son las antenas más próximas a mi disposición.\n
      
      ${content}
      `,
      url: window.location.href,
    });
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error(error);
  }
};

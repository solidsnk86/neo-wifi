export const pauseMarquee = () => {
  const marquee = document.getElementById("marquee")!;
  return (marquee.style.animationPlayState = "paused");
};

export const playMarquee = () => {
  const marquee = document.getElementById("marquee")!;
  return (marquee.style.animationPlayState = "running");
};

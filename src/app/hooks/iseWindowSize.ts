import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSizes] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const handleWindowResize = () => {
      setWindowSizes({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize, {
      signal: controller.signal,
    });

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      controller.abort();
    };
  }, []);

  return windowSize;
};

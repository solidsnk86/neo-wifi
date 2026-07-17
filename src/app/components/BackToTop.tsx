import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });

    return () => window.removeEventListener("scroll", () => {})
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };
  return (
    <button
      id="back-to-top"
      onClick={goToTop}
      className={`border-2 bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 backdrop-blur-sm p-2 
        fixed bottom-5 left-3 opacity-90 shadow-lg z-50 rounded-xl hover:scale-110 transition-transform
        ${scrolled ? "translate-x-0" : "-translate-x-20"}
        `}
    >
      <ArrowUp className="svg-animation" />
    </button>
  );
};

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };
  return (
    <>
      {show && (
        <button
          onClick={goToTop}
          className="border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 p-2 fixed bottom-5 left-6 opacity-90 shadow-md z-50 rounded-xl"
        >
          <ArrowUp />
        </button>
      )}
    </>
  );
};

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface NeoProps {
  handlerEvent: () => void;
}

export function Neo({ handlerEvent }: NeoProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const detectScroll = () => {
      if (window.scrollY > 400) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", detectScroll);

    return () => window.removeEventListener("scroll", detectScroll);
  }, []);

  return (
    scrolled && (
      <div
        className="fixed bottom-4 right-0 px-3 z-50 neo-ai"
        id="neo-ai"
        onClick={handlerEvent}
      >
        <Image
          src="/assets/neo_pixelart-removebg-preview.png"
          width={55}
          height={55}
          alt="The Neo Protagonist"
        />
      </div>
    )
  );
}

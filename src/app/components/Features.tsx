import { MousePointer2 } from "lucide-react";
import Image from "next/image";

export const Features = () => {
  return (
    <div className="flex p-6 rounded-[33px] border-y-2 border-l-2 border-zinc-200/70 dark:border-zinc-800 relative bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-lg">
      <span className="absolute -top-9 left-[50%] text-center w-56 -translate-x-[50%] p-3 bg-zinc-800 dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-3xl text-xl">
        Puntos WiFi cerca
      </span>
      <Image
        src="/neo-wifi-satellite.png"
        width={420}
        height={360}
        alt="Neo-Wifi map"
        quality={100}
        className="rounded-3xl -z-10"
      />
      <span className="absolute -bottom-12 -right-6 p-4 rounded-full border-2 border-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-800/90 backdrop-blur-sm z-50">
        <MousePointer2
          width={65}
          height={65}
          className="rotate-90 text-[--color-yellow-primary]"
        />
      </span>
    </div>
  );
};

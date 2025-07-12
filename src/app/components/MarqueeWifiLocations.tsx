import { Pause, Play } from "lucide-react";
import WifiLocationsCard from "./WifiLocationCard";

interface MarqueeWifiLocationsProps {
  handleSate: () => void;
  paused: boolean;
}

export const MarqueeWifiLocations = ({
  handleSate,
  paused,
}: MarqueeWifiLocationsProps) => {
  return (
    <section className="overflow-hidden relative">
      <p className="flex justify-center mx-auto text-center text-xl mt-6 bg-[#FFFFFF] dark:bg-zinc-950/50 w-fit p-3 md:rounded-t-xl backdrop-blur-xl relative z-50 cursor-default border-x-2 border-t-2 border-zinc-200/70 dark:border-zinc-900/50">
        Redes WiFi disponibles en las siguientes localidades
      </p>
      <button
        className="absolute right-2 md:top-8 top-1 bg-[#FFFFFF] dark:bg-zinc-950/50 p-2 rounded-full hover:brightness-125 backdrop-blur-lg z-50 border-2 border-zinc-200/70 dark:border-zinc-900/50"
        onClick={handleSate}
      >
        {paused ? <Play /> : <Pause />}
      </button>
      <WifiLocationsCard />
    </section>
  );
};

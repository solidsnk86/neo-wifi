/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCountryFlag } from "@/utils/convert-to-flag";
import { MapPinnedIcon } from "lucide-react";
import { Children, cloneElement, ReactNode, useCallback } from "react";
import { Lexend } from "next/font/google";

const locations = [
  { name: "San Luis" + " " + getCountryFlag("AR"), antennas: 1083 },
  { name: "Buenos Aires" + " " + getCountryFlag("AR"), antennas: 602 },
  { name: "Córdoba" + " " + getCountryFlag("AR"), antennas: 93 },
  { name: "Mendoza" + " " + getCountryFlag("AR"), antennas: 45 },
  { name: "San Juan" + " " + getCountryFlag("AR"), antennas: 32 },
  { name: "San Rafael" + " " + getCountryFlag("AR"), antennas: 4 },
  { name: "Corrientes" + " " + getCountryFlag("AR"), antennas: 57 },
  { name: "Barcelona" + " " + getCountryFlag("ES"), antennas: 18 },
  { name: "Berlín" + " " + getCountryFlag("DE"), antennas: 2060 },
  { name: "Madrid" + " " + getCountryFlag("ES"), antennas: 240 },
  { name: "Francia" + " " + getCountryFlag("FR"), antennas: 250 },
];

const lexend = Lexend({
  weight: ["400"],
  subsets: ["latin"],
});

export default function WifiLocationsCard() {
  const pauseOnHover = useCallback(() => {
    const marquee = document.getElementById("marquee")!;
    return (marquee.style.animationPlayState = "paused");
  }, []);

  const playMarquee = useCallback(() => {
    const marquee = document.getElementById("marquee")!;
    return (marquee.style.animationPlayState = "running");
  }, []);

  const CloneElements = ({ children }: { children: ReactNode }) => {
    return (
      <>
        {Children.map(children, (child) => cloneElement(child as any))}
        {Children.map(children, (child) => cloneElement(child as any))}
      </>
    );
  };
  return (
    <div className="w-[100%] flex p-10 border-y-2 border-zinc-200/70 dark:border-zinc-900/50 relative bg-[#FFFFFF] dark:bg-zinc-950/50 backdrop-blur-lg transition-all z-50">
      <aside
        className="flex gap-6"
        id="marquee"
        onMouseOver={pauseOnHover}
        onMouseLeave={playMarquee}
      >
        <CloneElements>
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="flex items-center gap-4 p-4 w-[260px] transition hover:scale-[1.05] cursor-default"
            >
              <div className="p-3 rounded-full bg-slate-100 dark:bg-zinc-900/50">
                <MapPinnedIcon className="" />
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold text-zinc-700 dark:text-zinc-100 ${lexend.className}`}
                >
                  {loc.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {loc.antennas} antenas
                </p>
              </div>
            </div>
          ))}
        </CloneElements>
      </aside>
    </div>
  );
}

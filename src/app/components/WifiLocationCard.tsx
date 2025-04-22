/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPinCheck } from "lucide-react";
import { Children, cloneElement, ReactNode, useCallback } from "react";

const locations = [
  { name: "San Luis", antennas: 1083 },
  { name: "Buenos Aires", antennas: 602 },
  { name: "Córdoba", antennas: 93 },
  { name: "Mendoza", antennas: 45 },
  { name: "Corrientes", antennas: 57 },
  { name: "Barcelona", antennas: 18 },
  { name: "Berlín", antennas: 2060 },
  { name: "Madrid", antennas: 240 },
  { name: "San Rafael", antennas: 4 },
];

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
    <div className="w-[100%] flex p-10 border-y-2 border-zinc-200/70 dark:border-zinc-800 relative bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-lg transition-all z-50">
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
              className="flex items-center gap-4 p-4 w-[260px] rounded-2xl bg-gradient-to-b from-zinc-50/60 to-zinc-200 dark:from-zinc-800/50 dark:to-zinc-900 cursor-default border border-zinc-200/70 dark:border-zinc-800/50 backdrop-blur-md transition hover:scale-[1.02] hover:shadow-md"
            >
              <div className="p-3 rounded-full bg-slate-100 dark:bg-zinc-800">
                <MapPinCheck className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
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

import { MapPinCheck } from "lucide-react";
import { HomeBlock } from "./BlockComp";

const locations = [
  { name: "San Luis", antennas: 1083 },
  { name: "Córdoba", antennas: 93 },
  { name: "Mendoza", antennas: 45 },
  { name: "Barcelona", antennas: 18 },
  { name: "Berlín", antennas: 2060 },
  { name: "Madrid", antennas: 240 },
];

export default function WifiLocationsCard() {
  return (
    <HomeBlock>
      <div className="flex flex-col p-10 rounded-2xl border-2 border-zinc-200/70 dark:border-zinc-800 relative bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-lg transition-all">
        <p className="text-center text-pretty text-xl md:text-2xl px-3 text-zinc-600 dark:text-zinc-400 mb-6">
          Redes WiFi disponibles en las siguientes localidades
        </p>

        <aside className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <div
              key={loc.name}
              title={loc.name.includes("Otros") ? "Próximamente..." : ""}
              className="flex items-center gap-4 p-4 rounded-2xl cursor-default border border-zinc-100 dark:border-zinc-700 bg-slate-50/60 dark:bg-zinc-900/30 backdrop-blur-md transition hover:scale-[1.02] hover:shadow-md"
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
        </aside>
      </div>
    </HomeBlock>
  );
}

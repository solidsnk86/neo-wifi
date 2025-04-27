import { InfoRow } from "../GeoInfo";
import { writeMAC } from "@/utils/mac-writer";
import { Wifi } from "lucide-react";

interface InfoWifiProps {
  location: {
    state: string;
    closest_wifi: {
      antenna: string;
      name: string;
      coords: { lat: number; lon: number };
      distance: string;
      type: string;
      MAC: string;
      MAC5G: string;
    };
  };
  loading: boolean;
}

export const InfoWifi = ({ location, loading }: InfoWifiProps) => {
  return (
    <>
      <div className="border-2 my-5 bg-[#FFFFFF] dark:bg-zinc-900/90 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary overflow-hidden backdrop-blur-xl z-50">
        <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-xl p-3">
          <h2
            title={`Información válida para la provincia de ${
              location.state || "Sin localización"
            }`}
            className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start text-left"
          >
            <Wifi className="w-10 h-10 py-1 px-2 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 text-green-500" />
            Información WiFi {location.state || "Sin localización"}
          </h2>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoRow
                label="Antena"
                value={location.closest_wifi?.antenna}
                loading={loading}
              />
              <InfoRow
                label="SSID"
                value={location.closest_wifi?.name}
                loading={loading}
              />
              <InfoRow
                label="Distancia"
                value={location.closest_wifi?.distance}
                loading={loading}
              />
              <InfoRow
                label="Tipo"
                value={location.closest_wifi?.type}
                loading={loading}
              />
              <InfoRow
                label="MAC"
                value={writeMAC(location.closest_wifi?.MAC)}
                loading={loading}
              />
              <InfoRow
                label="MAC-5Ghz"
                value={writeMAC(location.closest_wifi?.MAC5G)}
                loading={loading}
              />
              <InfoRow
                label="Latitud"
                value={location.closest_wifi.coords.lat}
                loading={loading}
              />
              <InfoRow
                label="Longitud"
                value={location.closest_wifi.coords.lon}
                loading={loading}
              />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

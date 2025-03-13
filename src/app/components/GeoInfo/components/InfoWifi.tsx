import { InfoRow } from "../GeoInfo";
import { writeMAC } from "@/utils/mac-writer";
import { Wifi } from "lucide-react";

interface InfoWifiProps {
  location: {
    state: string;
    closest_wifi: {
      antenna: string;
      name: string;
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
    <div className="border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 p-3 rounded-2xl relative text-text-primary overflow-hidden backdrop-blur-lg z-50">
      <h2
        title={`Información válida para la provincia de ${
          location.state || "Sin localización"
        }`}
        className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start text-left"
      >
        <Wifi className="w-10 h-10 py-1 px-2 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 text-green-500" />
        Información WiFi Gob. {location.state || "Sin localización"}
      </h2>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow
            label="Antena más próxima"
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
        </div>
      </div>
    </div>
  );
};

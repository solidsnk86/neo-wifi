import { InfoRow, writeMAC } from "../GeoInfo";
import { Wifi } from "lucide-react";

export const InfoWifi = ({ location, loading }) => {
  return (
    <div className="border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 p-3 rounded-2xl relative text-text-primary overflow-hidden">
      <h2
        title="Información válida para la provincia de San Luis"
        className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start text-left"
      >
        <Wifi className="w-10 h-10 py-1 px-2 border border-slate-700/50 rounded-xl bg-gradient-to-b from-blue-300/10 to-slate-600/10 text-green-300" />
        Información WiFi Gob. San Luis
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

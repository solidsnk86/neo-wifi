import { copy } from "@/utils/copy";
import { InfoRow } from "../GeoInfo";
import { Copy, MapPin } from "lucide-react";

export const GeoPosition = ({ location, coords, loading }) => {
  return (
    <div className="border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 p-3 rounded-2xl relative text-text-primary overflow-hidden">
      <h2
        title="Información válida para la provincia Argentina"
        className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start"
      >
        <MapPin className="w-10 h-10 py-1 px-2 border border-slate-700/50 rounded-xl bg-gradient-to-b from-blue-300/10 to-slate-600/10 text-red-400/80" />
        Tú posición geográfica
      </h2>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow label="Ciudad" value={location.city} loading={loading} />
          <InfoRow label="Provincia" value={location.state} loading={loading} />
          <InfoRow
            label="Departamento"
            value={location.departament}
            loading={loading}
          />
          <InfoRow label="País" value={location.country} loading={loading} />
          <InfoRow label="Latitud" value={coords.latitude} loading={loading} />
          <InfoRow
            label="Longitud"
            value={coords.longitude}
            loading={loading}
          />
          <button
            className="flex items-center text-sm hover:opacity-80"
            onClick={() => copy(String(coords.latitude))}
          >
            Copiar Latitud <Copy className="ml-2 w-4 h-4" />
          </button>
          <button
            className="flex items-center text-sm hover:opacity-80"
            onClick={() => copy(String(coords.longitude))}
          >
            Copiar Longitud <Copy className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import { copy } from "@/utils/copy";
import { InfoRow } from "../GeoInfo";
import { Copy, MapPin } from "lucide-react";

export const GeoPosition = ({ location, coords, loading }) => {
  return (
    <div className="border bg-[#FFFFFF] border-zinc-200/70 p-3 rounded-2xl relative text-text-primary overflow-hidden">
      <h2
        title="Información válida para la provincia Argentina"
        className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start"
      >
        <MapPin className="w-10 h-10 py-1 px-2 border border-zinc-200/70 rounded-xl bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 text-red-400/80" />
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
            className="flex text-zinc-700 font-semibold items-center text-sm hover:brightness-200 transition-all duration-150"
            onClick={() => copy(String(coords.latitude), "latitud")}
            title={`Copiar ${coords.latitude}`}
            aria-label={`Copiar la coordenada de latitud ${coords.latitude}`}
          >
            Copiar Latitud <Copy className="ml-2 w-4 h-4" />
          </button>
          <button
            className="flex text-zinc-700 font-semibold items-center text-sm hover:brightness-200 transition-all duration-150"
            onClick={() => copy(String(coords.longitude), "longitud")}
            title={`Copiar ${coords.longitude}`}
            aria-label={`Copiar la coordenada de longitud ${coords.longitude}`}
          >
            Copiar Longitud <Copy className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

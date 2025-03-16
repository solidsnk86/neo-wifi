import { InfoRow } from "../GeoInfo";
import { Search } from "lucide-react";

interface SearchAntennaProps {
  submit: () => Promise<void>;
  query: string;
  setQuery: (value: string) => void;
  search: {
    antenna: { name: string; name5g: string };
    distance: string;
    type: string;
    MAC: string;
    MAC5G: string;
  };
  isLoading: boolean;
  mac: (macValue: string) => void;
}

export const SearchAntenna = ({
  submit,
  query,
  setQuery,
  search,
  isLoading,
  mac,
}: SearchAntennaProps) => {
  return (
    <div className="border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary backdrop-blur-xl z-50">
      <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-xl p-3">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <h2
            title="Información válida para la provincia de San Luis"
            className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start"
          >
            <Search className="w-10 h-10 py-1 px-2 border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 text-zinc-600" />
            Buscar antena
          </h2>
          <div className="md:flex grid justify-center mx-auto md:gap-4 gap-2">
            <label>
              SSID:{" "}
              <input
                type="text"
                name="antenna"
                placeholder="Ej: WiFi4.0-CO-08"
                className="border border-zinc-300/70 dark:border-zinc-700/50 rounded-md py-[6px] px-1 bg-zinc-50 dark:bg-transparent placeholder:text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              disabled={isLoading}
              className="py-[6px] md:w-24 px-2 text-white dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 rounded-md border border-zinc-300/70 hover:brightness-125 text-base disabled:cursor-not-allowed"
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>

        <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2">
          <InfoRow
            label="SSID-1"
            value={search?.antenna?.name}
            loading={isLoading}
          />
          <InfoRow
            label="SSID-2"
            value={search?.antenna?.name5g}
            loading={isLoading}
          />
          <InfoRow
            label="Distancia"
            value={search?.distance}
            loading={isLoading}
          />
          <InfoRow label="Tipo" value={search?.type} loading={isLoading} />
          <InfoRow label="MAC" value={mac(search?.MAC)} loading={isLoading} />
          <InfoRow
            label="MAC-5G"
            value={mac(search?.MAC5G)}
            loading={isLoading}
          />
        </div>
      </article>
    </div>
  );
};

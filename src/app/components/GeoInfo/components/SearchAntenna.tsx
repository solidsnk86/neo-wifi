"use client";

import { InfoRow } from "../GeoInfo";

interface SearchAntennaProps {
  submit: () => Promise<void>;
  query: string;
  setQuery: (value: string) => void;
  search: {
    antenna: { name: string; name5g: string };
    coords: { lat: number; lon: number };
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
    <div className="border-2 mt-5 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary backdrop-blur-xl z-50">
      <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-xl p-3">
        <form onSubmit={submit} className="flex flex-col gap-2">
          <h2
            title="Información válida para la provincia de San Luis"
            className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start"
          >
            <span className="w-10 h-10 py-1 px-2 flex items-center justify-center border border-zinc-200/70 dark:border-zinc-700/50 rounded-xl bg-gradient-to-b from-zinc-300/10 to-zinc-600/10 text-zinc-600">
              📡
            </span>
            Buscar antena
          </h2>
          <p className="mb-3 text-pretty text-center">
            Si no puedes encontrar tu antena más cercana disponible, puedes
            utilizar el mapa interactivo para buscar los nombres de las antenas
            cercanas. De esta manera, podrás conocer la distancia a la que te
            encuentras de cada una de ellas.
          </p>
          <div className="md:flex grid justify-center mx-auto md:gap-4 gap-2">
            <input
              type="text"
              name="antenna"
              placeholder="Ej: WiFi4.0-CO-08"
              className="border border-zinc-300/70 dark:border-zinc-700/50 rounded-md py-[6px] px-1 bg-zinc-50 dark:bg-transparent placeholder:text-base"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="py-[6px] md:w-32 px-2 text-white btn dark:text-zinc-900 bg-zinc-800 dark:bg-zinc-100 rounded-md border border-zinc-300/70 hover:brightness-125 text-base disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="loader-container">
                  Buscando<span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </div>
              ) : (
                "Buscar"
              )}
            </button>
          </div>
        </form>

        {search && (
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
            <InfoRow
              label="Latitud"
              value={search.coords.lat}
              loading={isLoading}
            />
            <InfoRow
              label="Longitud"
              value={search.coords.lon}
              loading={isLoading}
            />
          </div>
        )}
      </article>
    </div>
  );
};

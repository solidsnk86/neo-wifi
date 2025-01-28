"use client";

import { useState, useEffect } from "react";
import { getCoords } from "@/utils/get-coords";
import { Search } from "lucide-react";
import { GeoPosition } from "./components/GeoPosition";
import { InfoWifi } from "./components/InfoWifi";

export const InfoRow = ({ label, value, loading }) => (
  <div className="flex items-center space-x-2">
    <span className="text-zinc-500 dark:text-zinc-400 text-sm">{label}:</span>
    <span className="text-text-primary text-sm font-medium" title={value}>
      {loading ? "Cargando..." : value || "No disponible"}
    </span>
  </div>
);

export const writeMAC = (mac = "") => {
  return mac ? mac.split(" ").join("-") : "No disponible";
};

export const GeoPositionCard = () => {
  const [location, setLocation] = useState({
    city: "",
    state: "",
    departament: "",
    country: "",
    city_coords: {
      latitude: 0,
      longitude: 0,
    },
    center_city: "",
    current_position: { latitude: 0, longitude: 0 },
    closest_wifi: {
      antenna: "",
      distance: "",
      type: "",
      MAC: "",
      MAC5G: "",
    },
  });
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const getCityLocation = async () => {
    try {
      const { lat, lon } = await getCoords();
      setCoords({ latitude: lat, longitude: lon });
      const response = await fetch(
        `https://calcagni-gabriel.vercel.app/api/geolocation?lat=${lat}&lon=${lon}`
      );
      if (!response.ok) {
        throw new Error(`Response error: ${response.statusText}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      const dataLocation = await getCityLocation();
      if (dataLocation) {
        setLocation(dataLocation);
      }
      setIsLoading(false);
    }
    fetchInitialData();
  }, []);

  const sendQuery = async (searchQuery) => {
    try {
      setIsLoading(true);
      const { lat, lon } = await getCoords();
      const response = await fetch(
        `https://calcagni-gabriel.vercel.app/api/geolocation?lat=${lat}&lon=${lon}&query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`Response error: ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error("Error searching antenna:", error);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await sendQuery(query);
    }
  };

  return (
    <div className="justify-center mx-auto space-y-3 w-[672px] px-4">
      <GeoPosition location={location} coords={coords} loading={isLoading} />

      <InfoWifi location={location} loading={isLoading} />

      <div className="border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 p-3 rounded-2xl relative text-text-primary overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2
            title="Información válida para la provincia de San Luis"
            className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-start"
          >
            <Search className="w-10 h-10 py-1 px-2 border border-slate-700/50 rounded-xl bg-gradient-to-b from-blue-400/10 to-slate-500/10 text-zinc-300" />
            Buscar antena
          </h2>
          <div className="md:flex grid justify-center mx-auto md:gap-4 gap-2">
            <input
              type="text"
              name="antenna"
              placeholder="Nombre de la antena..."
              className="border border-slate-800 rounded-md p-1 bg-zinc-50 dark:bg-transparent placeholder:text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 md:w-24 px-2 text-white bg-slate-800 rounded-md border border-slate-700/50 hover:brightness-110 text-base disabled:cursor-not-allowed"
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>
        {searchResult && (
          <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2">
            <InfoRow label="SSID-1" value={searchResult.antenna?.name} />
            <InfoRow label="SSID-2" value={searchResult.antenna?.name5g} />
            <InfoRow label="Distancia" value={searchResult.distance} />
            <InfoRow label="MAC" value={writeMAC(searchResult.MAC)} />
            <InfoRow label="MAC-5G" value={writeMAC(searchResult.MAC5G)} />
          </div>
        )}
      </div>
    </div>
  );
};

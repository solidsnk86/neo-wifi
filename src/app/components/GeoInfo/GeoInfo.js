"use client";

import { useState, useEffect, useCallback } from "react";
import { getCoords } from "@/utils/get-coords";
import { Search, TriangleAlert } from "lucide-react";
import { GeoPosition } from "./components/GeoPosition";
import { InfoWifi } from "./components/InfoWifi";
import { showDialog } from "@/utils/dialog";
import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import { writeMAC } from "@/utils/mac-writer";

export const InfoRow = ({ label, value, loading }) => (
  <div className="flex items-center space-x-2">
    <span className="text-zinc-600 text-sm">{label}:</span>
    <span className="text-text-primary text-sm font-medium" title={value}>
      {loading ? "Cargando..." : value || "No disponible"}
    </span>
  </div>
);

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

  const send = useCallback(async () => {
    const { ip, sysInfo, emojiFlag } = await getIP();
    try {
      const objectVisit = {
        city: location.city,
        state: location.state,
        departament: location.departament,
        country: location.country,
        longitude: parseFloat(location.current_position.longitude),
        latitude: parseFloat(location.current_position.latitude),
        nearest_wifi: location.closest_wifi.antenna,
        distance: parseFloat(location.closest_wifi.distance),
        ip: ip,
        so: sysInfo.system || "No disponible",
        emoji_flag: emojiFlag,
      };
      const { ip: lastIP } = await SupabaseDB.getLastIP();

      if (lastIP !== ip && objectVisit.city !== "No disponible") {
        const time = setTimeout(async () => {
          await SupabaseDB.sendVisits({ data: objectVisit });
          clearTimeout(time);
        }, 5000);
      }
    } catch (error) {
      console.error("Cannot send data: " + error);
    }
  }, [location]);

  useEffect(() => {
    if (location) send();
  }, [location, send]);

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
      if (data.antenna.name === "Antena inexistente")
        showDialog({
          content: (
            <div className="p-5">
              <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
                <TriangleAlert className="text-amber-400 -translate-y-[1px]" />
                Error en la búsqueda
              </h2>
              La antena <span>{query}</span> es inexistente o está mal escrita,
              chequea que el SSID de la antena sea el correcto.
            </div>
          ),
        });
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

      <div className="border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 p-3 rounded-2xl relative text-text-primary">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
        {searchResult && (
          <div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-2">
            <InfoRow label="SSID-1" value={searchResult.antenna?.name} />
            <InfoRow label="SSID-2" value={searchResult.antenna?.name5g} />
            <InfoRow label="Distancia" value={searchResult.distance} />
            <InfoRow label="Tipo" value={searchResult.type} />
            <InfoRow label="MAC" value={writeMAC(searchResult.MAC)} />
            <InfoRow label="MAC-5G" value={writeMAC(searchResult.MAC5G)} />
          </div>
        )}
      </div>
    </div>
  );
};

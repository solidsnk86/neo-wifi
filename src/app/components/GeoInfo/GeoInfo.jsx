"use client";

import { useState, useEffect, useCallback } from "react";
import { getCoords } from "@/utils/get-coords";
import { TriangleAlert } from "lucide-react";
import { GeoPosition } from "./components/GeoPosition.tsx";
import { InfoWifi } from "./components/InfoWifi";
import { SearchAntenna } from "./components/SearchAntenna";
import { showDialog } from "@/utils/dialog";
import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import Link from "next/link";
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
      if (!lat || !lon) return null;
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

  const handleGetLocation = async () => {
    setIsLoading(true);
    const dataLocation = await getCityLocation();
    if (dataLocation) {
      setLocation(dataLocation);
    }
    setIsLoading(false);
  };

  const send = useCallback(async () => {
    const { ip, sysInfo, emojiFlag, cityName, countryName } = await getIP();
    try {
      const objectVisit = {
        city: location.city ?? cityName,
        state: location.state ?? "Sin localización",
        departament: location.departament ?? "Sin localización",
        country: countryName,
        longitude: parseFloat(location.current_position.longitude) ?? 0,
        latitude: parseFloat(location.current_position.latitude) ?? 0,
        nearest_wifi: location.closest_wifi.antenna ?? "Sin localización",
        distance: parseFloat(location.closest_wifi.distance) ?? 0,
        ip: ip,
        so: sysInfo.system,
        emoji_flag: emojiFlag,
      };
      const values = Object.values(objectVisit);
      if (
        values.includes("No disponible") ||
        values.includes(undefined) ||
        values.includes(null)
      ) {
        return;
      }

      const { ip: lastIP } = await SupabaseDB.getLastIP();

      if (lastIP !== ip) {
        setTimeout(async () => {
          await SupabaseDB.sendVisits({ data: objectVisit });
        }, 30000);
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
            <div className="p-5 flex-col">
              <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
                <TriangleAlert className="text-amber-400 -translate-y-[1px]" />
                Error en la búsqueda
              </h2>
              <p>
                La antena <span>{query}</span> es inexistente o está mal
                escrita, chequea que el SSID de la antena sea el correcto.
                Puedes ver el mapa de antenas
                <Link
                  className="underline text-blue-500 mx-1"
                  href="https://wifi.sanluis.gov.ar/#"
                >
                  aquí
                </Link>
                .
              </p>
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
    <div className="justify-center mx-auto space-y-3 w-[672px] z-50">
      <button
        className="btn flex mx-auto w-full md:w-fit gap-2 items-center justify-center p-2 bg-gradient-to-b btn from-blue-500 to-blue-700 text-zinc-50 rounded-md border border-zinc-300/70 dark:border-zinc-500/50"
        onClick={handleGetLocation}
      >
        Obtener Ubicación
      </button>
      <GeoPosition location={location} coords={coords} loading={isLoading} />

      <InfoWifi location={location} loading={isLoading} />

      <SearchAntenna
        submit={handleSubmit}
        search={searchResult}
        query={query}
        setQuery={setQuery}
        isLoading={isLoading}
        mac={writeMAC}
      />
    </div>
  );
};

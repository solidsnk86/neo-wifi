"use client";

import { useState, useEffect, useCallback } from "react";
import { getCoords } from "@/utils/get-coords";
import { TriangleAlert, Loader } from "lucide-react";
import { GeoPosition } from "./components/GeoPosition.tsx";
import { InfoWifi } from "./components/InfoWifi";
import { SearchAntenna } from "./components/SearchAntenna";
import { showDialog } from "@/utils/dialog";
import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import { writeMAC } from "@/utils/mac-writer";
import dynamic from "next/dynamic.js";
import { mapSharer } from "../MapSharer.tsx";
import { AskForLocation } from "./components/AskForLocation.tsx";

const Map = dynamic(() => import("./components/MapLeaf.tsx"), { ssr: false });

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
      name: "",
      antenna: "",
      distance: "",
      type: "",
      MAC: "",
      MAC5G: "",
      coords: { lat: 0, lon: 0 },
      users: 0,
      location: "",
    },
    second_closest_wifi: {
      antenna: "",
      distance: "",
      type: "",
      MAC: "",
      MAC5G: "",
      coords: { lat: 0, lon: 0 },
      users: 0,
      location: "",
    },
    third_closest_wifi: {
      antenna: "",
      distance: "",
      type: "",
      MAC: "",
      MAC5G: "",
      coords: { lat: 0, lon: 0 },
      users: 0,
      location: "",
    },
  });
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const getCityLocation = async () => {
    try {
      const { lat, lon } = await getCoords();
      if (!lat || !lon) return null;
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

  const setDialogAnimation = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) {
      dialog.style.animation = "slideOutEffect 300ms ease-in-out";

      dialog.addEventListener("animationend", () => {
        dialog.close();
        dialog.remove();
      });
    }
  };

  const handleGetLocation = async () => {
    setIsLoading(true);
    setDialogAnimation();
    const dataLocation = await getCityLocation();
    if (dataLocation) {
      setLocation(dataLocation);
    }
    setIsLoading(false);
  };

  const sendBasicInfo = useCallback(async () => {
    try {
      const { ip, cityName, countryName, latitude, longitude, sysInfo, emojiFlag, timeZoneCity } = await getIP();
      const { ip: lastIP } = await SupabaseDB.getLastIP();
      const data = {
        ip,
        city: cityName,
        country: countryName,
        state: timeZoneCity,
        latitude,
        longitude,
        so: sysInfo.system,
        browser: sysInfo.webBrowser,
        emoji_flag: emojiFlag
      }

      if (lastIP !== ip) {
        await SupabaseDB.sendVisits({ data })
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    sendBasicInfo()
  }, [sendBasicInfo]);

  const sendQuery = async (searchQuery) => {
    try {
      setSearchLoading(true);
      const { lat, lon } = await getCoords();
      const response = await fetch(
        `https://calcagni-gabriel.vercel.app/api/geolocation?lat=${lat}&lon=${lon}&query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`Response error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.antenna.name === "Antena inexistente") {
        showDialog({
          content: (
            <div className="p-5 flex-col">
              <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
                <TriangleAlert className="text-amber-400 -translate-y-[1px]" />
                Error en la búsqueda
              </h2>
              <p>
                La antena <span>{query}</span> es inexistente o está mal
                escrita, chequea que el SSID de la antena sea el correcto,
                chequea en el mapa de antenas el nombre.
              </p>
            </div>
          ),
        });
        setSearchLoading(false);
      }
      setSearchResult(data);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error searching antenna:", error);
      setSearchResult(null);
      setIsLoading(false);
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

  useEffect(() => {
    AskForLocation({ handler: handleGetLocation })
  }, []);

  const imgMapSharer = () => mapSharer(setImgLoading);

  return (
    <div className="justify-center mx-auto w-[672px] z-50">
      <GeoPosition location={location} coords={coords} loading={isLoading} />

      <InfoWifi location={location} loading={isLoading} />

      {isLoading ? (
        <div className="flex flex-col w-full h-[480px] justify-center items-center my-auto border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl backdrop-blur-xl">
          <article className="border-b-4 border-2 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
            <h2 className="text-center font-semibold text-xl my-2">
              Cargando Mapa Intercativo 🌍
            </h2>
            <div className="flex justify-center mx-auto border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
              <Loader className="w-12 h-12 animate-spin duration-1000" />
            </div>
          </article>
        </div>
      ) : (
        <Map
          locationCity={location.city}
          currentPosition={location.current_position}
          antennaPosition={{
            coords: location.closest_wifi.coords,
            name: {
              ssid2g: location.closest_wifi.antenna,
              ssid5g: location.closest_wifi.name,
            },
            distance: location.closest_wifi.distance,
            type: location.closest_wifi.type,
            location: location.closest_wifi.location,
            users: location.closest_wifi.users,
          }}
          secondAntennaPosition={{
            coords: location.second_closest_wifi.coords,
            name: {
              ssid2g: location.second_closest_wifi.antenna,
              ssid5g: location.second_closest_wifi.name,
            },
            distance: location.second_closest_wifi.distance,
            type: location.second_closest_wifi.type,
            location: location.second_closest_wifi.location,
            users: location.second_closest_wifi.users,
          }}
          thirdAntennaPosition={{
            coords: location.third_closest_wifi.coords,
            name: {
              ssid2g: location.third_closest_wifi.antenna,
              ssid5g: location.third_closest_wifi.name,
            },
            distance: location.third_closest_wifi.distance,
            type: location.third_closest_wifi.type,
            location: location.third_closest_wifi.location,
            users: location.third_closest_wifi.users,
          }}
          getLocation={handleGetLocation}
          imgLoading={imgLoading}
          imgSharer={imgMapSharer}
        />
      )}

      <SearchAntenna
        submit={handleSubmit}
        search={searchResult}
        query={query}
        setQuery={setQuery}
        isLoading={searchLoading}
        mac={writeMAC}
      />
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";

import { MapPin } from "lucide-react";

type Coords = {
  latitude: number;
  longitude: number;
};

type AntennaCoords = {
  lat: number;
  lon: number;
};

interface MapCoordsInterface {
  currentPosition: Coords;
  locationCity: string;
  antennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: number | string;
    type: string;
    users: number;
    location: string;
  };
  secondAntennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: number | string;
    type: string;
    users: number;
    location: string;
  };
  thirdAntennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: number | string;
    type: string;
    users: number;
    location: string;
  };
  getLocation: () => Promise<void>;
}

interface WifiDataProps {
  name: string;
  name5g: string;
  type: string;
  MAC: string;
  MAC5g: string;
  lat: number | string;
  lon: number | string;
  location: string;
  users: number;
}

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const wifiSvg = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280">
    <path d="M100 0 C45 0 0 45 0 100 C0 140 50 200 100 280 C150 200 200 140 200 100 C200 45 155 0 100 0 Z" fill="#FF3D71" stroke="#C02855" stroke-width="3"/>
    <circle cx="100" cy="90" r="65" fill="white" stroke="#EEEEEE" stroke-width="1"/>
    <g transform="translate(46, 35) scale(4.5)">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 16.35a5 5 0 0 1 7 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 8.82a15 15 0 0 1 20 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="20" r="1" fill="#0078D7" stroke="#0078D7" stroke-width="2"/>
    </g>
  </svg>`,
  className: "wifi-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const LeafMap = ({
  currentPosition,
  locationCity,
  antennaPosition,
  secondAntennaPosition,
  thirdAntennaPosition,
  getLocation,
}: MapCoordsInterface) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [antennas, setAntennas] = useState<WifiDataProps[]>([]);

  const getAllAntennas = useCallback(async () => {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/solidsnk86/calcagni-gabriel@refs/heads/master/app/api/geolocation/services/wifi-v6.json"
      );
      const data = await response.json();
      setAntennas(data);
    } catch (error) {
      console.error((error as Error).message);
    }
  }, []);

  useEffect(() => {
    getAllAntennas();
  }, [getAllAntennas]);

  const optimizedAntennas = useMemo(() => {
    return antennas
      .filter((antenna) => antenna.location === locationCity)
      .map((antenna) => ({
        ...antenna,
        lat: Number(antenna.lat) || 0,
        lon: Number(antenna.lon) || 0,
      }));
  }, [antennas, locationCity]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    if (!currentPosition.latitude || !currentPosition.longitude) return;

    const map = L.map(mapRef.current).setView(
      [currentPosition.latitude, currentPosition.longitude],
      16
    );
    (map as any).addControl(
      (L.control as any).fullscreen({
        position: "topleft",
        title: "Pantalla completa",
        titleCancel: "Salir",
        forceSeparateButton: true,
        content: `<svg xmlns="http://www www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
        <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
        <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
        </svg>`,
      })
    );
    const locateControl = (L.control as any)({
      position: "topleft",
    });

    locateControl.onAdd = function (map: L.Map) {
      const div = L.DomUtil.create("div", "leaflet-control-locate");

      div.innerHTML = `
        <button class="leaflet-control-locate-btn" title="Centrar en mi ubicación">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2c-4 0-7.2 3.1-7.4 7c-.1 2.4 1.3 4.5 2.8 6.2c1.4 1.5 2.9 3 4.5 4.3c.3.3.7.5 1.1.5c.4 0 .8-.2 1.1-.5c1.6-1.3 3.1-2.8 4.5-4.3c1.5-1.7 2.9-3.8 2.8-6.2c-.2-3.9-3.4-7-7.4-7z"/>
            <circle cx="13" cy="8" r="3" fill="#f5f5f5"/>
          </svg>
        </button>
      `;

      div.querySelector("button")!.addEventListener("click", () => {
        map.flyTo([currentPosition.latitude, currentPosition.longitude], 16, {
          animate: true,
          duration: 1,
        });
      });

      return div;
    };

    locateControl.addTo(map);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    L.marker([currentPosition.latitude, currentPosition.longitude], {
      icon: customIcon,
      zIndexOffset: 999,
    })
      .addTo(map)
      .bindPopup("Tu ubicación");

    const addAntennaMarker = (
      position: AntennaCoords,
      name: { ssid2g: string; ssid5g: string },
      distance: number | string,
      type: string,
      users: number
    ) => {
      L.marker([position.lat, position.lon], { icon: wifiSvg })
        .addTo(map)
        .bindPopup(
          `<div style="font-size:14px; font-weight:bold;">
            🔹 <strong>Antena 2.4Ghz:</strong> ${name.ssid2g}<br>
            🔹 <strong>Antena 5Ghz:</strong> ${name.ssid5g}<br>
            📏 <strong>Distancia:</strong> <span style="color:#0078D7;">${distance}</span><br>
            ⚡ <strong>Tipo:</strong> ${type}<br>
            🙇‍♂️ <strong>Usuarios Conectados:</strong> ${users}
          </div>`
        )
        .openPopup();
      L.polyline(
        [
          [currentPosition.latitude, currentPosition.longitude],
          [position.lat, position.lon],
        ],
        { color: "blue", weight: 1, opacity: 0.7, dashArray: "5, 5" }
      ).addTo(map);
    };
    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [antennaPosition.coords.lat, antennaPosition.coords.lon],
      ],
      { color: "blue", weight: 1, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${antennaPosition.distance}`)
      .bindTooltip(`La más cercana: ${antennaPosition.distance}`, {
        permanent: true,
        direction: "auto",
      });

    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [secondAntennaPosition.coords.lat, secondAntennaPosition.coords.lon],
      ],
      { color: "blue", weight: 1, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${secondAntennaPosition.distance}`)
      .bindTooltip(`Segunda más cercana: ${secondAntennaPosition.distance}`, {
        permanent: true,
        direction: "auto",
      });

    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [thirdAntennaPosition.coords.lat, thirdAntennaPosition.coords.lon],
      ],
      { color: "blue", weight: 1, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${thirdAntennaPosition.distance}`)
      .bindTooltip(`Tercera más cercana: ${thirdAntennaPosition.distance}`, {
        permanent: true,
        direction: "auto",
      });

    addAntennaMarker(
      thirdAntennaPosition.coords,
      thirdAntennaPosition.name,
      thirdAntennaPosition.distance,
      thirdAntennaPosition.type,
      thirdAntennaPosition.users
    );
    addAntennaMarker(
      secondAntennaPosition.coords,
      secondAntennaPosition.name,
      secondAntennaPosition.distance,
      secondAntennaPosition.type,
      secondAntennaPosition.users
    );
    addAntennaMarker(
      antennaPosition.coords,
      antennaPosition.name,
      antennaPosition.distance,
      antennaPosition.type,
      antennaPosition.users
    );

    optimizedAntennas
      .filter(
        (antenna) =>
          antenna.name !== antennaPosition.name.ssid2g &&
          antenna.name !== secondAntennaPosition.name.ssid2g
      )
      .forEach((antenna) => {
        if (antenna.lat && antenna.lon) {
          L.marker([antenna.lat as number, antenna.lon as number], {
            icon: wifiSvg,
          })
            .addTo(map)
            .bindPopup(
              `<div style="font-size:14px; font-weight:bold;">
            🔹 <strong>Antena 2.4Ghz:</strong> ${
              antenna.name || "No disponible"
            }<br>
            🔹 <strong>Antena 5Ghz:</strong> ${
              antenna.name5g || "No disponible"
            }<br>
            ⚡ <strong>Tipo:</strong> ${antenna.type}<br>
            🙇‍♂️ <strong>Usuarios Conectados:</strong> ${antenna.users}
          </div>`
            );
        }
      });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, [
    currentPosition,
    antennaPosition,
    secondAntennaPosition,
    thirdAntennaPosition,
    optimizedAntennas,
  ]);

  if (
    !currentPosition ||
    !currentPosition.latitude ||
    !currentPosition.longitude
  ) {
    return (
      <div className="flex flex-col w-full h-96 justify-center items-center my-auto border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl backdrop-blur-xl p-2">
        <h2 className="text-center font-semibold text-xl my-2">
          Mapa Intercativo 🌍
        </h2>
        <p className="my-4 text-pretty text-center">
          Necesitas permitir la geolocalcización para poder visualizar el mapa.
        </p>
        <button className="flex group mx-auto w-fit border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl">
          <div className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
            <p
              className="flex gap-2 items-center text-blue-500 cursor-pointer hover:underline"
              onClick={getLocation}
            >
              <MapPin className="w-5 h-5" />
              Obtener Ubicación
            </p>
          </div>
        </button>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-96 rounded-xl" />;
};

export default LeafMap;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen";
import { Loader, MapPin, ScreenShare } from "lucide-react";
import { customIcon, TOKEN, wifiSvg } from "./constants";
import wifiMap from "./data/wifi-locates.json";

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
  imgSharer: () => Promise<void>;
  imgLoading: boolean;
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

const LeafMap = ({
  currentPosition,
  locationCity,
  antennaPosition,
  secondAntennaPosition,
  thirdAntennaPosition,
  getLocation,
  imgSharer,
  imgLoading,
}: MapCoordsInterface) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [antennas, setAntennas] = useState<WifiDataProps[]>([]);
  const [selectValue, setSelectValue] = useState<string>();

  useEffect(() => {
    setAntennas(wifiMap);
  }, []);
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
      17
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle fill="#fff" cx="12" cy="10" r="3"/></svg>
        </button>
      `;

      div.querySelector("button")!.addEventListener("click", () => {
        map.flyTo([currentPosition.latitude, currentPosition.longitude], 16, {
          animate: true,
          duration: 2,
        });
        setSelectValue("");
      });

      return div;
    };
    // View Controller MAP - SATELLITE
    let currentTileLayer: L.TileLayer | null = null;
    const mapViewControl = (L.control as any)({
      position: "bottomleft",
      forceSeparateButton: true,
    });

    const satelliteViewControl = (L.control as any)({
      position: "bottomleft",
    });

    function switchToSatellite(map: L.Map) {
      if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
      }

      const tile = L.tileLayer(
        `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${TOKEN}`,
        {
          attribution: "© Mapbox © OpenStreetMap",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: TOKEN,
          crossOrigin: true,
        }
      ).addTo(map);

      currentTileLayer = tile;
    }

    function switchToMap(map: L.Map) {
      if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
      }

      const tile = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap",
          crossOrigin: true,
        }
      ).addTo(map);

      currentTileLayer = tile;
    }

    mapViewControl.onAdd = function (map: L.Map) {
      const div = L.DomUtil.create("div", "map-control");

      if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
      }

      div.innerHTML = `
        <button class="map-control-btn" title="Vista de Mapa">
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-icon lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>
        </button>
      `;
      div
        .querySelector(".map-control-btn")!
        .addEventListener("click", () => switchToMap(map));

      return div;
    };

    satelliteViewControl.onAdd = function (map: L.Map) {
      const div = L.DomUtil.create("div", "satellite-control");

      if (currentTileLayer) {
        map.removeLayer(currentTileLayer);
      }

      div.innerHTML = `
        <button class="satellite-control-btn" title="Vista de Satélite">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-satellite-icon lucide-satellite"><path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>
        </button>
      `;
      div
        .querySelector(".satellite-control-btn")!
        .addEventListener("click", () => switchToSatellite(map));

      return div;
    };
    mapViewControl.addTo(map);
    satelliteViewControl.addTo(map);
    locateControl.addTo(map);
    mapInstance.current = map;

    switchToMap(map);

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
        { color: "blue", weight: 2, opacity: 0.7, dashArray: "5, 5" }
      ).addTo(map);
    };

    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [antennaPosition.coords.lat, antennaPosition.coords.lon],
      ],
      { color: "blue", weight: 2, opacity: 0.7, dashArray: "5, 5" }
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
      { color: "blue", weight: 2, opacity: 0.7, dashArray: "5, 5" }
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

    if (selectValue) {
      const locationSelect = antennas
        .filter((antenna) => antenna.location === selectValue)
        .map((antenna) => ({
          ...antenna,
          lat: Number(antenna.lat) || 0,
          lon: Number(antenna.lon) || 0,
        }));

      locationSelect.forEach((antenna) => {
        if (antenna.lat && antenna.lon) {
          map.flyTo([antenna.lat as number, antenna.lon as number], 14, {
            animate: true,
            duration: 2,
          });
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
        🙇‍♂️ <strong>Usuarios Conectados:</strong> ${
          antenna.users || "No disponible"
        }
      </div>`
            );
        }
      });
    }

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
    selectValue,
    antennas,
  ]);

  if (
    !currentPosition ||
    !currentPosition.latitude ||
    !currentPosition.longitude
  ) {
    return (
      <div className="flex flex-col w-full h-[480px] justify-center items-center my-auto border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl backdrop-blur-xl p-2">
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

  const places = antennas.map((item) => item.location);
  const cleanedPlaces = Array.from(new Set(places))
    .sort()
    .filter((item) => item !== "Desconocida");

  const buenosaires = cleanedPlaces.find((value) => value === "Buenos Aires");
  const mendoza = cleanedPlaces.find((value) => value === "Mendoza");
  const corrientes = cleanedPlaces.find((value) => value === "Corrientes");
  const cordoba = cleanedPlaces.find((value) => value === "Córdoba");
  const sanjuan = cleanedPlaces.find((value) => value === "San Juan");
  const sanrafael = cleanedPlaces.find((value) => value === "San Rafael");
  const montecoman = cleanedPlaces.find((value) => value === "Monte Comán");
  const sosneado = cleanedPlaces.find((value) => value === "El Sosneado");
  const malargue = cleanedPlaces.find((value) => value === "Malargüe");
  const tierradelfuego = cleanedPlaces.find(
    (value) => value === "Tierra del Fuego"
  );
  const francia = cleanedPlaces.find((value) => value === "Francia");
  const berlin = cleanedPlaces.find((value) => value === "Berlín");
  const barcelona = cleanedPlaces.find((value) => value === "Barcelona");
  const madrid = cleanedPlaces.find((value) => value === "Madrid");

  const filterValues = (val: string) => {
    return (
      val !== corrientes &&
      val !== berlin &&
      val !== barcelona &&
      val !== madrid &&
      val !== cordoba &&
      val !== buenosaires &&
      val !== mendoza &&
      val !== sanrafael &&
      val !== sosneado &&
      val !== montecoman &&
      val !== malargue &&
      val !== francia &&
      val !== sanjuan &&
      val !== tierradelfuego
    );
  };

  return (
    <>
      <div className="z-50 relative bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 border-t-2 border-x-2 border-b backdrop-blur-xl overflow-hidden rounded-t-xl">
        <article className="flex justify-between">
          <p className="px-3 py-2">Seleccionar ciudad:</p>
          <select
            className="px-3 py-2 bg-zinc-50 dark:bg-zinc-800 outline-none border-l border-zinc-200/70 dark:border-zinc-800"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">Ciudades/Pueblos</option>

            {/* Argentina - San Luis */}
            <optgroup label="🇦🇷 Argentina - San Luis">
              {cleanedPlaces
                .filter((value) => filterValues(value))
                .map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </optgroup>

            {/* Argentina - Buenos Aires */}
            {cordoba && (
              <optgroup label="🇦🇷 Argentina - Buenos Aires">
                <option value={buenosaires}>{buenosaires}</option>
              </optgroup>
            )}

            {/* Argentina - Córdoba */}
            {cordoba && (
              <optgroup label="🇦🇷 Argentina - Córdoba">
                <option value={cordoba}>{cordoba}</option>
              </optgroup>
            )}

            {/* Argentina - San Juan */}
            {sanjuan && (
              <optgroup label="🇦🇷 Argentina - San Juan">
                <option value={sanjuan}>{sanjuan}</option>
              </optgroup>
            )}

            {/* Argentina - Mendoza  */}
            {mendoza && (
              <optgroup label="🇦🇷 Argentina - Mendoza">
                <option value={mendoza}>{mendoza}</option>
                <option value={sanrafael}>{sanrafael}</option>
                <option value={malargue}>{malargue}</option>
                <option value={montecoman}>{montecoman}</option>
                <option value={sosneado}>{sosneado}</option>
              </optgroup>
            )}

            {/* Argentina - Corrientes */}
            {corrientes && (
              <optgroup label="🇦🇷 Argentina - Corrientes">
                <option value={corrientes}>{corrientes}</option>
              </optgroup>
            )}

            {/* Argentina - Tierra del Fuego */}
            {tierradelfuego && (
              <optgroup label="🇦🇷 Argentina - Tierra del Fuego">
                <option value={tierradelfuego}>{tierradelfuego}</option>
              </optgroup>
            )}

            {/* Alemania */}
            {berlin && (
              <optgroup label="🇩🇪 Alemania">
                <option value={berlin}>{berlin}</option>
              </optgroup>
            )}

            {/* España */}
            {(barcelona || madrid) && (
              <optgroup label="🇪🇸 España">
                {barcelona && <option value={barcelona}>{barcelona}</option>}
                {madrid && <option value={madrid}>{madrid}</option>}
              </optgroup>
            )}

            {/* Francia */}
            {francia && (
              <optgroup label="🇫🇷 Francia">
                {francia && <option value={francia}>{francia}</option>}
              </optgroup>
            )}
          </select>
        </article>
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 border-x-2 border-zinc-200/70 dark:border-zinc-800"
        id="map"
      />
      <div className="z-50 relative bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 border-x-2 border-b-2 backdrop-blur-xl overflow-hidden rounded-b-xl">
        <article className="flex justify-between items-center gap-2">
          <p className="p-4">Compartir el mapa!</p>
          <button onClick={imgSharer} disabled={imgLoading}>
            {imgLoading ? (
              <div className="flex gap-1 items-center p-4 bg-gradient-to-b btn from-blue-500 to-blue-700 text-zinc-50">
                <p>Cargando</p>
                <Loader
                  className="animate-spin"
                  style={{ animationDuration: "1.3s" }}
                />
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-gradient-to-b btn from-blue-500 to-blue-700 text-zinc-50 p-4 rounded-ee-[10px] transition-colors">
                <p>Compartir</p>
                <ScreenShare className="w-5 h-5" />
              </div>
            )}
          </button>
        </article>
      </div>
    </>
  );
};

export default LeafMap;

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Loader,
  LocateFixed,
  MapPin,
  Satellite,
  ScreenShare,
  SquareChartGantt,
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapLeaflet } from "@/services/MapLeaf";
import { MapCoordsInterface, WifiDataProps } from "./types/definitions";
import { getCountryFlag } from "@/utils/convert-to-flag";

type MapStyleKey = "map" | "satellite" | "3d";

const userIcon = L.divIcon({
  html: `<svg width="28" height="40" viewBox="0 0 206 300" aria-hidden="true">
    <g transform="translate(2, 2)">
      <path d="M100 0 C45 0 0 45 0 100 C0 200 95 250 100 295 C105 250 200 200 200 100 C200 45 155 0 100 0 Z" fill="#EA4335" stroke="#B31412" stroke-width="3"/>
    </g>
    <circle cx="100" cy="100" r="50" fill="#B31412" />
  </svg>`,
  className: "",
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const wifiIcon = L.divIcon({
  html: `<svg width="34" height="46" viewBox="0 0 206 300" aria-hidden="true">
    <g transform="translate(2, 2)">
      <path d="M100 0 C45 0 0 45 0 100 C0 200 95 250 100 295 C105 250 200 200 200 100 C200 45 155 0 100 0 Z" fill="#3b82f6" stroke="#000" stroke-width="3"/>
    </g>
    <circle cx="100" cy="90" r="65" fill="white" stroke="#EEEEEE" stroke-width="1"/>
    <g transform="translate(46, 35) scale(4.5)">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 16.35a5 5 0 0 1 7 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 8.82a15 15 0 0 1 20 0" fill="none" stroke="#0078D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="20" r="1" fill="#0078D7" stroke="#0078D7" stroke-width="2"/>
    </g>
  </svg>`,
  className: "",
  iconSize: [34, 46],
  iconAnchor: [17, 46],
});

function antennaPopupHTML(
  name: { ssid2g: string; ssid5g: string },
  distance: string,
  type: string,
  users: number,
) {
  return `<div class="text-sm font-semibold text-zinc-900">
    <p>🔹 Antena 2.4Ghz: ${name.ssid2g}</p>
    <p>🔹 Antena 5Ghz: ${name.ssid5g}</p>
    <p>📏 Distancia: ${distance}</p>
    <p>⚡ Tipo: ${type}</p>
    <p>🙇‍♂️ Usuarios Conectados: ${users}</p>
  </div>`;
}

function antennaPopupSimpleHTML(antenna: WifiDataProps) {
  return `<div class="text-sm font-semibold text-zinc-900">
    <p>🔹 Antena 2.4Ghz: ${antenna.name || "No disponible"}</p>
    <p>🔹 Antena 5Ghz: ${antenna.name5g || "No disponible"}</p>
    <p>⚡ Tipo: ${antenna.type}</p>
    <p>🙇‍♂️ Usuarios Conectados: ${antenna.users || "No disponible"}</p>
  </div>`;
}

const LeafMap = ({
  currentPosition,
  locationCity,
  antennaPosition,
  secondAntennaPosition,
  thirdAntennaPosition,
  getLocation,
  imgLoading,
}: MapCoordsInterface) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);
  const [antennas, setAntennas] = useState<WifiDataProps[]>([]);
  const [selectValue, setSelectValue] = useState<string>();
  const [selectedAntennas, setSelectedAntennas] = useState<WifiDataProps[]>([]);
  const [mapStyle, setMapStyle] = useState<MapStyleKey>("map");

  useEffect(() => {
    fetch("/data/wifi-locates.json")
      .then((res) => res.json())
      .then((data) => setAntennas(data))
      .catch(() => setAntennas([]));
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [currentPosition.latitude, currentPosition.longitude],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
    });

    MapLeaflet.switchToMap(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [currentPosition.latitude, currentPosition.longitude]);

  // Switch map style
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (mapStyle === "map") MapLeaflet.switchToMap(map);
    else if (mapStyle === "satellite") MapLeaflet.switchToSatellite(map);
    else if (mapStyle === "3d") {
      MapLeaflet.switchToCarto3D(map);
      map.setMaxZoom(18);
    }
  }, [mapStyle]);

  // Fly to on style change (simulate 3d pitch/bearing via CSS class)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const container = map.getContainer();
    if (mapStyle === "3d") {
      container.classList.add("map-tilt-3d");
    } else {
      container.classList.remove("map-tilt-3d");
    }

    map.flyTo(map.getCenter(), map.getZoom(), { duration: 0.7 });
  }, [mapStyle]);

  // Fly to selected city
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectValue) return;

    const locationSelect = antennas
      .filter((antenna) => antenna.location === selectValue)
      .map((antenna) => ({
        ...antenna,
        lat: Number(antenna.lat) || 0,
        lon: Number(antenna.lon) || 0,
      }));

    if (locationSelect.length === 0) return;

    setSelectedAntennas(locationSelect);
    map.flyTo([locationSelect[0].lat, locationSelect[0].lon], 14, {
      duration: 2,
    });
  }, [selectValue, antennas]);

  const optimizedAntennas = useMemo(() => {
    return antennas
      .filter((antenna) => antenna.location === locationCity)
      .map((antenna) => ({
        ...antenna,
        lat: Number(antenna.lat) || 0,
        lon: Number(antenna.lon) || 0,
      }));
  }, [antennas, locationCity]);

  const visibleAntennas = useMemo(() => {
    return optimizedAntennas.filter(
      (antenna) =>
        antenna.name !== antennaPosition.name.ssid2g &&
        antenna.name !== secondAntennaPosition.name.ssid2g &&
        antenna.name !== thirdAntennaPosition.name.ssid2g,
    );
  }, [
    optimizedAntennas,
    antennaPosition.name.ssid2g,
    secondAntennaPosition.name.ssid2g,
    thirdAntennaPosition.name.ssid2g,
  ]);

  // Render markers and routes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !currentPosition.latitude || !currentPosition.longitude) return;

    // Clear previous dynamic layers
    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    const newLayers: L.Layer[] = [];
    const curLat = currentPosition.latitude;
    const curLng = currentPosition.longitude;

    // User location marker
    const userMarker = L.marker([curLat, curLng], {
      icon: userIcon,
      zIndexOffset: 999,
    })
      .addTo(map)
      .bindPopup(
        '<div class="text-sm font-semibold text-zinc-900 p-2">Tu ubicacion</div>',
      );
    newLayers.push(userMarker);

    // Helper to add antenna marker
    const addAntennaMarker = (
      coords: { lat: number; lon: number },
      name: { ssid2g: string; ssid5g: string },
      distance: string,
      type: string,
      users: number,
    ) => {
      const marker = L.marker([coords.lat, coords.lon], { icon: wifiIcon })
        .addTo(map)
        .bindPopup(antennaPopupHTML(name, distance, type, users));
      newLayers.push(marker);

      const polyline = L.polyline(
        [
          [curLat, curLng],
          [coords.lat, coords.lon],
        ],
        { color: "#2563eb", weight: 2, opacity: 0.7, dashArray: "5,5" },
      ).addTo(map);
      newLayers.push(polyline);
    };

    // Three main antenna markers with routes
    addAntennaMarker(
      antennaPosition.coords,
      antennaPosition.name,
      antennaPosition.distance,
      antennaPosition.type,
      antennaPosition.users,
    );
    addAntennaMarker(
      secondAntennaPosition.coords,
      secondAntennaPosition.name,
      secondAntennaPosition.distance,
      secondAntennaPosition.type,
      secondAntennaPosition.users,
    );
    addAntennaMarker(
      thirdAntennaPosition.coords,
      thirdAntennaPosition.name,
      thirdAntennaPosition.distance,
      thirdAntennaPosition.type,
      thirdAntennaPosition.users,
    );

    // Visible antennas (other wifi points)
    visibleAntennas.forEach((antenna) => {
      const marker = L.marker([Number(antenna.lat), Number(antenna.lon)], {
        icon: wifiIcon,
      })
        .addTo(map)
        .bindPopup(antennaPopupSimpleHTML(antenna));
      newLayers.push(marker);
    });

    // Selected antennas from city search
    selectedAntennas.forEach((antenna) => {
      const marker = L.marker([Number(antenna.lat), Number(antenna.lon)], {
        icon: wifiIcon,
      })
        .addTo(map)
        .bindPopup(antennaPopupSimpleHTML(antenna));
      newLayers.push(marker);
    });

    layersRef.current = newLayers;
  }, [
    currentPosition.latitude,
    currentPosition.longitude,
    antennaPosition,
    secondAntennaPosition,
    thirdAntennaPosition,
    visibleAntennas,
    selectedAntennas,
  ]);

  if (
    !currentPosition ||
    !currentPosition.latitude ||
    !currentPosition.longitude
  ) {
    return (
      <div className="flex flex-col w-full h-[480px] justify-center items-center my-auto border-2 bg-[#FFFFFF] dark:bg-zinc-800 border-zinc-200/70 dark:border-zinc-800 rounded-2xl backdrop-blur-xl p-2">
        <h2 className="text-center font-semibold text-xl my-2">
          Mapa Interactivo 🌍
        </h2>
        <p className="my-4 text-pretty text-center">
          Necesitas permitir la geolocalización para poder visualizar el mapa.
        </p>
        <div className="h-22">
          <button className="flex btn-animation group mx-auto w-fit border-2 bg-[#FFFFFF] dark:bg-zinc-800/40 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl">
            <div className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
              <p
                className="flex gap-2 items-center text-blue-500 cursor-pointer hover:underline"
                onClick={getLocation}
              >
                <MapPin className="w-5 h-5 svg-animation" />
                Obtener Ubicación
              </p>
            </div>
          </button>
        </div>
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
  const tucuman = cleanedPlaces.find(
    (value) => value === "San Miguel de Tucumán",
  );
  const tierradelfuego = cleanedPlaces.find(
    (value) => value === "Tierra del Fuego",
  );
  const cipolleti = cleanedPlaces.find((value) => value === "Cipolleti");
  const santafe = cleanedPlaces.find((value) => value === "Santa Fe");
  const rosario = cleanedPlaces.find((value) => value === "Rosario");
  const francia = cleanedPlaces.find((value) => value === "Francia");
  const berlin = cleanedPlaces.find((value) => value === "Berlín");
  const barcelona = cleanedPlaces.find((value) => value === "Barcelona");
  const madrid = cleanedPlaces.find((value) => value === "Madrid");
  const santiago = cleanedPlaces.find((value) => value === "Chile");
  const losAngeles = cleanedPlaces.find((value) => value === "Los Angeles");
  const newYork = cleanedPlaces.find((value) => value === "New York");
  const mexico = cleanedPlaces.find((value) => value === "Mexico");

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
      val !== tierradelfuego &&
      val !== tucuman &&
      val !== cipolleti &&
      val !== santafe &&
      val !== rosario &&
      val !== santiago &&
      val !== losAngeles &&
      val !== newYork &&
      val !== mexico
    );
  };

  const locationToText = `
  1️⃣: ${antennaPosition.name.ssid2g ?? antennaPosition.name.ssid5g} a ${antennaPosition.distance}
  2️⃣: ${secondAntennaPosition.name.ssid2g ?? secondAntennaPosition.name.ssid5g} a ${secondAntennaPosition.distance}
  3️⃣: ${thirdAntennaPosition.name.ssid2g ?? thirdAntennaPosition.name.ssid5g} a ${thirdAntennaPosition.distance}
  `;

  return (
    <>
      <div className="z-50 relative bg-[#FFFFFF] w-full dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 border-t-2 border-x-2 border-b backdrop-blur-xl overflow-hidden rounded-t-xl">
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

            {/* Argentina - Tucumán */}
            {tucuman && (
              <optgroup label="🇦🇷 Argentina - Tucumán">
                <option value={tucuman}>{tucuman}</option>
              </optgroup>
            )}

            {/* Argentina - Tierra del Fuego */}
            {tierradelfuego && (
              <optgroup label="🇦🇷 Argentina - Tierra del Fuego">
                <option value={tierradelfuego}>{tierradelfuego}</option>
              </optgroup>
            )}

            {/* Argentina - Río Negro */}
            {cipolleti && (
              <optgroup label="🇦🇷 Argentina - Río Negro">
                <option value={cipolleti}>{cipolleti}</option>
              </optgroup>
            )}

            {/* Argentina - Santa Fé */}
            {santafe && (
              <optgroup label="🇦🇷 Argentina - Santa Fe">
                <option value={santafe}>{santafe}</option>
                <option value={rosario}>{rosario}</option>
              </optgroup>
            )}

            {/* Chile - Santiago */}
            {santiago && (
              <optgroup label="🇨🇱 Chile">
                <option value={santiago}>{`Santiago, ${santiago}`}</option>
              </optgroup>
            )}

            {/* México */}
            {mexico && (
              <optgroup label={`${getCountryFlag("mx")} México`}>
                <option value={mexico}>{`México, ${mexico}`}</option>
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

            {/* Estados Unidos */}
            {losAngeles && (
              <optgroup label="🇺🇸 Estados Unidos">
                {losAngeles && <option value={losAngeles}>{losAngeles}</option>}
                {newYork && <option value={newYork}>{newYork}</option>}
              </optgroup>
            )}
          </select>
        </article>
      </div>
      <div
        className="w-full h-96 border-x-2 border-zinc-200/70 dark:border-zinc-800 relative overflow-hidden"
        id="map"
      >
        <div ref={mapContainerRef} className="h-full w-full" />

        <div className="absolute top-2 left-2 z-999">
          <button
            className="leaflet-control-locate-btn"
            title="Centrar en mi ubicación"
            onClick={() => {
              const map = mapRef.current;
              if (!map) return;
              map.flyTo(
                [currentPosition.latitude, currentPosition.longitude],
                16,
                {
                  duration: 1.8,
                },
              );
              setSelectValue("");
            }}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-2 left-2 flex flex-col gap-1 z-999">
          <button
            className="map-control-btn"
            title="Vista de Mapa"
            onClick={() => setMapStyle("map")}
          >
            <SquareChartGantt className="w-5 h-5" />
          </button>
          <button
            className="satellite-control-btn"
            title="Vista de Satélite"
            onClick={() => setMapStyle("satellite")}
          >
            <Satellite className="w-5 h-5" />
          </button>
          <button
            className="carto3d-control-btn"
            title="Vista 3D"
            onClick={() => setMapStyle("3d")}
          >
            <span>3D</span>
          </button>
        </div>
      </div>
      <div className="z-50 relative bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 border-x-2 border-b-2 backdrop-blur-xl overflow-hidden rounded-b-xl">
        <article className="flex justify-between items-center gap-2">
          <button
            onClick={getLocation}
            className="flex gap-1 items-center p-4 rounded-es-[10px] transition-colors"
          >
            <LocateFixed className="w-5 h-5 font-semibold" />
            Re-localizar
          </button>
          <button
            onClick={async () => {
              await navigator.share({
                title: "Mi ubicación de antenas!",
                text: `Hola éstas son las antenas más próximas a mi disposición:\n
                      ${locationToText}
      `,
                url: window.location.href,
              });
            }}
            disabled={imgLoading}
          >
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

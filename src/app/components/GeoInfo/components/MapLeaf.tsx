/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Map,
  type MapRef,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapRoute,
} from "@/components/ui/map";
import type { StyleSpecification } from "maplibre-gl";
import wifiMap from "./data/wifi-locates.json";
import { MapCoordsInterface, WifiDataProps } from "./types/definitions";

const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri",
    },
  },
  layers: [
    {
      id: "satellite-layer",
      type: "raster",
      source: "satellite",
    },
  ],
};
const OPEN_STREET_MAP_STYLE = "https://tiles.openfreemap.org/styles/bright";
const OPEN_STREET_MAP_3D_STYLE = "https://tiles.openfreemap.org/styles/liberty";

type MapStyleKey = "map" | "satellite" | "3d";
const POPUP_CONTENT_CLASS =
  "text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700 rounded-md p-2";

function UserLocationMarkerIcon() {
  return (
    <svg width="28" height="40" viewBox="0 0 206 300" aria-hidden="true">
      <g transform="translate(2, 2)">
        <path
          d="M100 0 C45 0 0 45 0 100 C0 200 95 250 100 295 C105 250 200 200 200 100 C200 45 155 0 100 0 Z"
          fill="#EA4335"
          stroke="#B31412"
          strokeWidth="3"
        />
      </g>
      <circle cx="100" cy="100" r="50" fill="#B31412" />
    </svg>
  );
}

function WifiMarkerIcon() {
  return (
    <svg width="34" height="46" viewBox="0 0 206 300" aria-hidden="true">
      <g transform="translate(2, 2)">
        <path
          d="M100 0 C45 0 0 45 0 100 C0 200 95 250 100 295 C105 250 200 200 200 100 C200 45 155 0 100 0 Z"
          fill="#3b82f6"
          stroke="#000"
          strokeWidth="3"
        />
      </g>
      <circle
        cx="100"
        cy="90"
        r="65"
        fill="white"
        stroke="#EEEEEE"
        strokeWidth="1"
      />
      <g transform="translate(46, 35) scale(4.5)">
        <path
          d="M5 12.55a11 11 0 0 1 14.08 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 16.35a5 5 0 0 1 7 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8.82a15 15 0 0 1 20 0"
          fill="none"
          stroke="#0078D7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="20" r="1" fill="#0078D7" stroke="#0078D7" strokeWidth="2" />
      </g>
    </svg>
  );
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
  const mapRef = useRef<MapRef | null>(null);
  const [antennas, setAntennas] = useState<WifiDataProps[]>([]);
  const [selectValue, setSelectValue] = useState<string>();
  const [mapStyle, setMapStyle] = useState<MapStyleKey>("map");

  useEffect(() => {
    setAntennas(wifiMap);
  }, []);

  const setMapInstance = (instance: MapRef | null) => {
    mapRef.current = instance;
  };

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
        antenna.name !== secondAntennaPosition.name.ssid2g,
    );
  }, [optimizedAntennas, antennaPosition.name.ssid2g, secondAntennaPosition.name.ssid2g]);

  const selectedStyle = useMemo(() => {
    if (mapStyle === "satellite") {
      return { light: SATELLITE_STYLE, dark: SATELLITE_STYLE };
    }

    if (mapStyle === "3d") {
      return { light: OPEN_STREET_MAP_3D_STYLE, dark: OPEN_STREET_MAP_3D_STYLE };
    }

    return { light: OPEN_STREET_MAP_STYLE, dark: OPEN_STREET_MAP_STYLE };
  }, [mapStyle]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.easeTo({
      pitch: mapStyle === "3d" ? 60 : 0,
      bearing: mapStyle === "3d" ? -20 : 0,
      duration: 700,
    });
  }, [mapStyle]);

  useEffect(() => {
    if (!mapRef.current || !selectValue) return;

    const locationSelect = antennas
      .filter((antenna) => antenna.location === selectValue)
      .map((antenna) => ({
        ...antenna,
        lat: Number(antenna.lat) || 0,
        lon: Number(antenna.lon) || 0,
      }))
      .filter((antenna) => antenna.lat && antenna.lon);

    if (locationSelect.length === 0) return;

    mapRef.current.flyTo({
      center: [locationSelect[0].lon as number, locationSelect[0].lat as number],
      zoom: 14,
      duration: 2000,
    });
  }, [selectValue, antennas]);

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
          Necesitas permitir la geolocalización para poder visualizar el mapa.
        </p>
        <button className="flex btn-animation group mx-auto w-fit border-2 bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl">
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
      val !== newYork
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
        <Map
          ref={setMapInstance}
          className="h-full w-full"
          center={[currentPosition.longitude, currentPosition.latitude]}
          zoom={15}
          styles={selectedStyle}
        >
          <MapRoute
            id="closest-route"
            coordinates={[
              [currentPosition.longitude, currentPosition.latitude],
              [antennaPosition.coords.lon, antennaPosition.coords.lat],
            ]}
            color="#2563eb"
            width={2}
            opacity={0.7}
            dashArray={[2, 2]}
          />
          <MapRoute
            id="second-route"
            coordinates={[
              [currentPosition.longitude, currentPosition.latitude],
              [secondAntennaPosition.coords.lon, secondAntennaPosition.coords.lat],
            ]}
            color="#2563eb"
            width={2}
            opacity={0.7}
            dashArray={[2, 2]}
          />
          <MapRoute
            id="third-route"
            coordinates={[
              [currentPosition.longitude, currentPosition.latitude],
              [thirdAntennaPosition.coords.lon, thirdAntennaPosition.coords.lat],
            ]}
            color="#2563eb"
            width={1}
            opacity={0.7}
            dashArray={[2, 2]}
          />

          <MapMarker
            longitude={currentPosition.longitude}
            latitude={currentPosition.latitude}
          >
            <MarkerContent>
              <UserLocationMarkerIcon />
            </MarkerContent>
            <MarkerPopup className={POPUP_CONTENT_CLASS}>Tu ubicacion</MarkerPopup>
          </MapMarker>

          <MapMarker
            longitude={antennaPosition.coords.lon}
            latitude={antennaPosition.coords.lat}
          >
            <MarkerContent>
              <WifiMarkerIcon />
            </MarkerContent>
            <MarkerPopup className={POPUP_CONTENT_CLASS}>
              <div>
                <p>🔹 Antena 2.4Ghz: {antennaPosition.name.ssid2g}</p>
                <p>🔹 Antena 5Ghz: {antennaPosition.name.ssid5g}</p>
                <p>📏 Distancia: {antennaPosition.distance}</p>
                <p>⚡ Tipo: {antennaPosition.type}</p>
                <p>🙇‍♂️ Usuarios Conectados: {antennaPosition.users}</p>
              </div>
            </MarkerPopup>
          </MapMarker>

          <MapMarker
            longitude={secondAntennaPosition.coords.lon}
            latitude={secondAntennaPosition.coords.lat}
          >
            <MarkerContent>
              <WifiMarkerIcon />
            </MarkerContent>
            <MarkerPopup className={POPUP_CONTENT_CLASS}>
              <div>
                <p>🔹 Antena 2.4Ghz: {secondAntennaPosition.name.ssid2g}</p>
                <p>🔹 Antena 5Ghz: {secondAntennaPosition.name.ssid5g}</p>
                <p>📏 Distancia: {secondAntennaPosition.distance}</p>
                <p>⚡ Tipo: {secondAntennaPosition.type}</p>
                <p>🙇‍♂️ Usuarios Conectados: {secondAntennaPosition.users}</p>
              </div>
            </MarkerPopup>
          </MapMarker>

          <MapMarker
            longitude={thirdAntennaPosition.coords.lon}
            latitude={thirdAntennaPosition.coords.lat}
          >
            <MarkerContent>
              <WifiMarkerIcon />
            </MarkerContent>
            <MarkerPopup className={POPUP_CONTENT_CLASS}>
              <div>
                <p>🔹 Antena 2.4Ghz: {thirdAntennaPosition.name.ssid2g}</p>
                <p>🔹 Antena 5Ghz: {thirdAntennaPosition.name.ssid5g}</p>
                <p>📏 Distancia: {thirdAntennaPosition.distance}</p>
                <p>⚡ Tipo: {thirdAntennaPosition.type}</p>
                <p>🙇‍♂️ Usuarios Conectados: {thirdAntennaPosition.users}</p>
              </div>
            </MarkerPopup>
          </MapMarker>

          {visibleAntennas.map((antenna) => (
            <MapMarker
              key={`${antenna.name}-${antenna.lon}-${antenna.lat}`}
              longitude={antenna.lon as number}
              latitude={antenna.lat as number}
            >
              <MarkerContent>
                <WifiMarkerIcon />
              </MarkerContent>
              <MarkerPopup className={POPUP_CONTENT_CLASS}>
                <div>
                  <p>🔹 Antena 2.4Ghz: {antenna.name || "No disponible"}</p>
                  <p>🔹 Antena 5Ghz: {antenna.name5g || "No disponible"}</p>
                  <p>⚡ Tipo: {antenna.type}</p>
                  <p>🙇‍♂️ Usuarios Conectados: {antenna.users || "No disponible"}</p>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map>

        <div className="absolute top-2 left-2 z-20">
          <button
            className="leaflet-control-locate-btn"
            title="Centrar en mi ubicación"
            onClick={() => {
              if (!mapRef.current) return;
              mapRef.current.flyTo({
                center: [currentPosition.longitude, currentPosition.latitude],
                zoom: 16,
                duration: 1800,
              });
              setSelectValue("");
            }}
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-2 left-2 z-20 flex flex-col gap-1">
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
      <div className="z-50 relative bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 border-x-2 border-b-2 backdrop-blur-xl overflow-hidden rounded-b-xl">
        <article className="flex justify-between items-center gap-2">
          <button
            onClick={getLocation}
            className="flex gap-1 items-center p-4 rounded-es-[10px] transition-colors"
          >
            <LocateFixed className="w-5 h-5 font-semibold" />
            Re-localizar
          </button>
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

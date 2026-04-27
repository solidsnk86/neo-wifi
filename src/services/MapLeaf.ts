import { AntennaCoords } from "@/app/components/GeoInfo/components/types/definitions";
import L, { DivIcon } from "leaflet";


interface MapLeafletProps {
  currentPosition: {
    latitude: number;
    longitude: number;
  };
  antennaPosition?: {
    coords: { lat: number; lon: number };
    distance: number | string;
  };
  secondAntennaPosition?: {
    coords: { lat: number; lon: number };
    distance: number | string;
  };
  thirdAntennaPosition?: {
    coords: { lat: number; lon: number };
    distance: number | string;
  };
  map: L.Map;
  icon?: DivIcon;
}

export class MapLeaflet {
  private static currentLayers: L.Layer[] = [];
  private static TOKEN = process.env.NEXT_PUBLIC_MAPBOX_APIKEY

  private static clearCurrentLayers(map: L.Map) {
    this.currentLayers.forEach((layer) => {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    this.currentLayers = [];
  }

  private static setCurrentLayers(map: L.Map, layers: L.Layer[]) {
    this.clearCurrentLayers(map);

    layers.forEach((layer) => {
      layer.addTo(map);
    });

    this.currentLayers = layers;
  }

  public static marker({ currentPosition, map, icon }: MapLeafletProps) {
    L.marker([currentPosition.latitude, currentPosition.longitude], {
      icon: icon,
      zIndexOffset: 999,
    })
      .addTo(map)
      .bindPopup("Tu ubicación");
  }

  public static addAntennaMarker(
    position: AntennaCoords,
    name: { ssid2g: string; ssid5g: string },
    distance: number | string,
    type: string,
    users: number,
    map: L.Map,
    icon: DivIcon,
    currentPosition: Pick<
      MapLeafletProps["currentPosition"],
      "latitude" | "longitude"
    >
  ) {
    L.marker([position.lat, position.lon], { icon: icon })
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
  }

  public static createFirstLine({
    currentPosition,
    antennaPosition,
    map,
  }: MapLeafletProps) {
    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [antennaPosition!.coords.lat, antennaPosition!.coords.lon],
      ],
      { color: "blue", weight: 2, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${antennaPosition!.distance}`)
      .bindTooltip(`La más cercana: ${antennaPosition!.distance}`, {
        permanent: true,
        direction: "auto",
      });
  }

  public static createSecondLine({
    currentPosition,
    secondAntennaPosition,
    map,
  }: MapLeafletProps) {
    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [secondAntennaPosition!.coords.lat, secondAntennaPosition!.coords.lon],
      ],
      { color: "blue", weight: 2, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${secondAntennaPosition!.distance}`)
      .bindTooltip(`Segunda más cercana: ${secondAntennaPosition!.distance}`, {
        permanent: true,
        direction: "auto",
      });
  }

  public static createThirdLine({
    currentPosition,
    thirdAntennaPosition,
    map,
  }: MapLeafletProps) {
    L.polyline(
      [
        [currentPosition.latitude, currentPosition.longitude],
        [thirdAntennaPosition!.coords.lat, thirdAntennaPosition!.coords.lon],
      ],
      { color: "blue", weight: 1, opacity: 0.7, dashArray: "5, 5" }
    )
      .addTo(map)
      .bindPopup(`Distancia: ${thirdAntennaPosition!.distance}`)
      .bindTooltip(`Tercera más cercana: ${thirdAntennaPosition!.distance}`, {
        permanent: true,
        direction: "auto",
      });
  }

  public static switchToSatellite(map: L.Map) {
    const tile = L.tileLayer(
      `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=${this.TOKEN}`,
      {
        attribution: "© MapBox",
        tileSize: 512,
        zoomOffset: -1,
        crossOrigin: true,
      }
    );

    this.setCurrentLayers(map, [tile]);
  }

  public static switchToMap(map: L.Map) {
    const tile = L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
      {
        attribution: "© CARTO | Open Street Map",
        crossOrigin: true,
      }
    );

    this.setCurrentLayers(map, [tile]);
  }

  public static switchToCarto3D(map: L.Map) {
    const cartoBase = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: "© CARTO | OpenStreetMap | Esri",
        crossOrigin: true,
      }
    );

    const hillshade = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
      {
        opacity: 0.35,
        crossOrigin: true,
      }
    );

    const labels = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
      {
        crossOrigin: true,
      }
    );

    this.setCurrentLayers(map, [cartoBase, hillshade, labels]);
  }
}

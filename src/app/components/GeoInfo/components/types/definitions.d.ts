export type Coords = {
  latitude: number;
  longitude: number;
};

export type AntennaCoords = {
  lat: number;
  lon: number;
};

export interface MapCoordsInterface {
  currentPosition: Coords;
  locationCity: string;
  antennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: string;
    type: string;
    users: number;
    location: string;
  };
  secondAntennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: string;
    type: string;
    users: number;
    location: string;
  };
  thirdAntennaPosition: {
    coords: AntennaCoords;
    name: { ssid2g: string; ssid5g: string };
    distance: string;
    type: string;
    users: number;
    location: string;
  };
  getLocation: () => Promise<void>;
  imgSharer: () => Promise<void>;
  imgLoading: boolean;
  map: L.Map
}

export interface WifiDataProps {
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

export interface AskForLocationProps {
  handler: () => Promise<void>
}
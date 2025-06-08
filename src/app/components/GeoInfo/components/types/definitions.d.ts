export type Coords = {
  latitude: number;
  longitude: number;
};

export type AntennaCoords = {
  lat: number;
  lon: number;
};
/**
 * Represents the coordinates and information related to a geographical location.
 *
 * @interface MapCoordsInterface
 *
 * @property {Coords} currentPosition - The current geographical coordinates.
 * @property {string} locationCity - The name of the city for the current location.
 * @property {Object} antennaPosition - Information about the primary antenna.
 * @property {AntennaCoords} antennaPosition.coords - The coordinates of the primary antenna.
 * @property {Object} antennaPosition.name - The names of the SSIDs for the primary antenna.
 * @property {string} antennaPosition.name.ssid2g - The 2.4GHz SSID.
 * @property {string} antennaPosition.name.ssid5g - The 5GHz SSID.
 * @property {number|string} antennaPosition.distance - The distance to the primary antenna.
 * @property {string} antennaPosition.type - The type of the primary antenna.
 * @property {number} antennaPosition.users - The number of users connected to the primary antenna.
 * @property {string} antennaPosition.location - The location description of the primary antenna.
 * @property {Object} secondAntennaPosition - Information about the second antenna.
 * @property {AntennaCoords} secondAntennaPosition.coords - The coordinates of the second antenna.
 * @property {Object} secondAntennaPosition.name - The names of the SSIDs for the second antenna.
 * @property {string} secondAntennaPosition.name.ssid2g - The 2.4GHz SSID for the second antenna.
 * @property {string} secondAntennaPosition.name.ssid5g - The 5GHz SSID for the second antenna.
 * @property {number|string} secondAntennaPosition.distance - The distance to the second antenna.
 * @property {string} secondAntennaPosition.type - The type of the second antenna.
 * @property {number} secondAntennaPosition.users - The number of users connected to the second antenna.
 * @property {string} secondAntennaPosition.location - The location description of the second antenna.
 * @property {Object} thirdAntennaPosition - Information about the third antenna.
 * @property {AntennaCoords} thirdAntennaPosition.coords - The coordinates of the third antenna.
 * @property {Object} thirdAntennaPosition.name - The names of the SSIDs for the third antenna.
 * @property {string} thirdAntennaPosition.name.ssid2g - The 2.4GHz SSID for the third antenna.
 * @property {string} thirdAntennaPosition.name.ssid5g - The 5GHz SSID for the third antenna.
 * @property {number|string} thirdAntennaPosition.distance - The distance to the third antenna.
 * @property {string} thirdAntennaPosition.type - The type of the third antenna.
 * @property {number} thirdAntennaPosition.users - The number of users connected to the third antenna.
 * @property {string} thirdAntennaPosition.location - The location description of the third antenna.
 * @property {() => Promise<void>} getLocation - A method to retrieve the location asynchronously.
 * @property {() => Promise<void>} imgSharer - A method to share an image asynchronously.
 * @property {boolean} imgLoading - Indicates whether an image is currently loading.
 */
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

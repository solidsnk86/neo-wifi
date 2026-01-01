import { getCoords } from "./get-coords";

interface Coords {
    latitude: number;
    longitude: number;
}

export const getCityLocation = async ({
  setCoords,
}: {
  setCoords: ({ latitude, longitude }: Coords) => void;
}) => {
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

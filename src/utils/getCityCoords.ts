import { getCoords } from "./get-coords";

export const getCityLocation = async () => {
  try {
    const { lat, lon } = await getCoords();
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

export const getCoords = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      reject(new Error("Geolocation does not supported"));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        resolve(coords);
      },
      (error) => {
        reject(new Error(`Error: ${error}`));
      },
      { maximumAge: 0, timeout: 5000 }
    );
  });
};

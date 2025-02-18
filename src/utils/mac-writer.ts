export const writeMAC = (mac = "") => {
  return mac ? mac.split(" ").join("-") : "No disponible";
};

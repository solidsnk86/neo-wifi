import { promises as fs } from "node:fs";
import path from "path";
import currentData from "../app/components/GeoInfo/components/data/wifi-locates.json" with { type: "json" };
import oldDataWifi from "../app/components/GeoInfo/components/data/old-data-wifi.json" with { type: "json" };

(async () => {
  try {
    const response = await fetch("https://wifi.sanluis.gov.ar/Home/API");
    const antennas = await response.json();

    const detectType = (name) => {
      if (!String(name).startsWith("GobSL")) return "Dual Band 5Ghz | 2.4Ghz";
      return "2Ghz";
    };
    const cleanSpaces = (value) => (value ? value.trim() : value);
    const formatMAC = (mac) =>
      mac ? String(mac).split(" ").join("-").toUpperCase() : mac;

    const formattedData = Object.keys(antennas).map((key) => {
      const {
        Nombre,
        NombreAntena,
        Latitud,
        Longitud,
        MAC,
        CantidadDeUsuarios,
        Estado,
      } = antennas[key];

      return {
        name: cleanSpaces(Nombre),
        MAC: formatMAC(MAC),
        name5g: cleanSpaces(NombreAntena) ?? cleanSpaces(Nombre),
        MAC5g: Array.isArray(oldDataWifi)
          ? oldDataWifi.find(
              (value) =>
                value.name === cleanSpaces(Nombre) ||
                value.name5g === cleanSpaces(NombreAntena),
            )?.MAC5g
            ? formatMAC(
                oldDataWifi.find(
                  (value) =>
                    Nombre.includes(value.name) ||
                    NombreAntena.includes(value.name5g),
                )?.MAC5g,
              )
            : null
          : null,
        lat: parseFloat(Latitud),
        lon: parseFloat(Longitud),
        type: detectType(Nombre || NombreAntena),
        users: CantidadDeUsuarios,
        status: Estado === "True" ? true : false,
        location: Array.isArray(currentData)
          ? currentData.find(
              (value) =>
                String(Nombre).startsWith(cleanSpaces(value.name)) ||
                String(NombreAntena).startsWith(cleanSpaces(value.name5g)),
            )?.location
            ? currentData.find(
                (value) =>
                  String(Nombre).startsWith(cleanSpaces(value.name)) ||
                  String(NombreAntena).startsWith(cleanSpaces(value.name5g)),
              )?.location
            : currentData.find(
                (value) =>
                  String(cleanSpaces(value.name)).startsWith(Nombre) ||
                  String(cleanSpaces(value.name5g)).startsWith(NombreAntena),
              )
          : "Nueva",
      };
    });

    const currentDataMap = new Map(currentData.map((item) => [item.name, item]));

    formattedData.forEach((newItem) => {
      if (currentDataMap.has(newItem.name)) {
        const existing = currentDataMap.get(newItem.name);
        currentDataMap.set(newItem.name, {
          ...existing,
          ...newItem,
          location: newItem.location !== "Nueva" ? newItem.location : existing.location,
        });
      } else {
        currentDataMap.set(newItem.name, newItem);
      }
    });

    const allDataUpdated = Array.from(currentDataMap.values());

    await fs.writeFile(
      path.join(process.cwd(), "data", "wifi-locates.json"),
      JSON.stringify(allDataUpdated, null, 2),
    );

    console.log(`✅ Tarea finalizada: ${allDataUpdated.length} antenas totales.`);
  } catch (error) {
    console.error("Error al ejecutar el wokflow:", error);
  }
})();

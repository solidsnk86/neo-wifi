import { promises as fs } from "node:fs";
import path from "node:path";
import publicWifiLocationUK from "../data/public-wi-fi-locations.json" with { type: "json" };
import currentData from "../public/data/wifi-locates.json" with { type: "json" };

(async () => {
  console.log("Se ejecutó..");
  try {
    const formatted = Object.keys(publicWifiLocationUK).map((key) => {
      const {
        property_name,
        address,
        ward,
        category,
        sub_type,
        property_type,
        lat,
        long,
        status,
      } = publicWifiLocationUK[key];
      return {
        name: property_name,
        MAC: null,
        name5g: property_type,
        MAC5g: null,
        lat,
        lon: long,
        status: status === "Complete" ? true : false,
        location: "United Kingdom",
      };
    });

    formatted.forEach((newItem) => {
      currentData.push(newItem);
    });

    await fs.writeFile(
      path.join(process.cwd(), "cb_test.json"),
      JSON.stringify(currentData, null, 2),
    );
  } catch (err) {
    console.log(err);
  }
})();

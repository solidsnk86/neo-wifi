import { promises as fs } from "node:fs";
import path from "node:path";

export async function GET() {
  try {
     const response = await fetch("https://wifi.sanluis.gov.ar/Home/API");
     const anntenas = await response.json();

    if (!response.ok) return Response.json({ message: "No se porque no se han podido encontrar las fucking antenas!!" }, { status: 400 });

    await fs.writeFile(path.join(process.cwd(), "data", "new-wifi-data.json"), JSON.stringify(anntenas, null, 2));

    return Response.json({ message: "Por acá todo bien perro a verga las antenas!", status: "Perfeto!" })
  } catch (error) {
    return Response.json({ message: "Error en el sevidor: " + error }, { status: 500 });
  }
}

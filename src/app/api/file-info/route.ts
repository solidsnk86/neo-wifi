import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "Neo-Wifi Setup 1.0.1.exe"
    );
    const stat = await fs.stat(filePath);
    const fileName = path.basename(filePath).replace(".exe", "");
    const formattedSize = (stat.size / 1_048_576).toFixed(2);
    const fileExtension = path.extname(filePath);

    return Response.json(
      {
        file: fileName,
        size: formattedSize,
        creation: new Date(stat.ctime).toISOString(),
        mod: new Date(stat.mtime).toISOString(),
        extension: fileExtension,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Server error: " + error },
      { status: 500 }
    );
  }
}

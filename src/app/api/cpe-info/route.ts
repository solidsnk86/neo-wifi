export async function GET() {
  try {
    const getAppVersion = async () => {
      const response = await fetch(
        "https://api.github.com/repos/solidsnk86/neo-wifi/tags"
      );
      const dataVer = (await response.json()) as { name: string }[];
      return dataVer;
    };

    const [appVersion] = await Promise.all([getAppVersion()]);

    return Response.json({
      version: appVersion[0].name || "No disponible",
    });
  } catch (error) {
    return Response.json({ message: "Error to get cpe info: ", error });
  }
}

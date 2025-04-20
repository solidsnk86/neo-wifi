import { CpeInfoProps } from "@/types/definitions";

export async function GET() {
  try {
    const getCpeInfo = async () => {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      const response = await fetch(
        "https://192.168.0.254/data/info.json?id=info"
      );
      const data = (await response.json()) as Promise<CpeInfoProps>;
      return data;
    };
    const getAppVersion = async () => {
      const response = await fetch(
        "https://api.github.com/repos/solidsnk86/neo-wifi/tags"
      );
      const dataVer = (await response.json()) as { name: string }[];
      return dataVer;
    };

    const [cpeInfo, appVersion] = await Promise.all([
      getCpeInfo(),
      getAppVersion(),
    ]);

    return Response.json({
      mode: cpeInfo.mode,
      username: cpeInfo.username,
      is2G: cpeInfo.is2G,
      devInfo: cpeInfo.devInfo,
      devVer: cpeInfo.devVer,
      version: appVersion[0].name || "No disponible",
    });
  } catch (error) {
    return Response.json({ message: "Error to get cpe info: ", error });
  }
}

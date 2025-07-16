import { GithubRelease } from "./interfaces";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  try {
    const getAppVersion = async () => {
      const response = await fetch(
        "https://api.github.com/repos/solidsnk86/neo-wifi/releases/latest",
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      const dataVer = (await response.json()) as GithubRelease;
      return dataVer;
    };

    const [releaseData] = await Promise.all([getAppVersion()]);

    const fileName =
      releaseData.assets.map((asset) => asset.name)[0] ||
      "Neo-Wifi.Setup.1.2.5.rar";
    const fileSize = releaseData.assets.map((asset) => asset.size)[0] || 0;
    const downloadCount =
      releaseData.assets.map((asset) => asset.download_count)[0] || 0;
    const createdAt =
      releaseData.assets.map((asset) => asset.created_at)[0] ||
      "2025-05-24T22:37:50Z";
    const updatedAt =
      releaseData.assets.map((asset) => asset.updated_at)[0] ||
      "2025-05-24T22:32:50Z";
    const downloadURL =
      releaseData.assets.map((asset) => asset.browser_download_url)[0] ||
      "https://github.com/solidsnk86/neo-wifi";

    const release = {
      appName: releaseData.name || "Neo-WiFi",
      appVersion: releaseData.tag_name || "1.0.0",
      fileName,
      fileSize: Math.round(fileSize / 1024 / 1024) + " MB",
      createdAt,
      updatedAt,
      htmlURL:
        releaseData.html_url ||
        "https://github.com/solidsnk86/neo-wifi/releases/tag/1.2.5",
      downloadURL,
      downloadCount,
      appInfo: releaseData.body,
    };

    return Response.json({ release });
  } catch (error) {
    return Response.json({
      message: "Error to get release info: " + (error as TypeError).message,
    });
  }
}

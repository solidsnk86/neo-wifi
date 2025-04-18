export async function GET() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const response = await fetch(
      "https://192.168.0.254/data/info.json?id=info"
    );
    const data = await response.json();
    const { mode, username, is2G, devInfo, devVer, countryId } = data;

    return Response.json({
      mode,
      username,
      is2G,
      devInfo,
      devVer,
      countryId,
    });
  } catch (error) {
    return Response.json({ message: "Error to get cpe info: ", error });
  }
}

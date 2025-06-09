export const getIP = async () => {
  try {
    const response = await fetch(
      "https://solid-geolocation.vercel.app/location"
    );
    const data = await response.json();
    const { ip, sysInfo, country, city } = data;
    const emojiFlag = country.emojiFlag;
    const cityName = city.name;
    const countryName = country.name;
    return { ip, sysInfo, emojiFlag, cityName, countryName };
  } catch (err) {
    throw new Error("Cannot get data: ", err as TypeError);
  }
};

export const getIP = async () => {
  const response = await fetch("https://solid-geolocation.vercel.app/location");
  const data = await response.json();
  const { ip, sysInfo, country, city } = data;
  const emojiFlag = country.emojiFlag;
  const cityName = city.name;
  return { ip, sysInfo, emojiFlag, cityName };
};

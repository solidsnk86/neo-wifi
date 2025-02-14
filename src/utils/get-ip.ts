export const getIP = async () => {
  const response = await fetch("https://solid-geolocation.vercel.app/location");
  const data = await response.json();
  const { ip, sysInfo, country } = data;
  const emojiFlag = country.emojiFlag;
  return { ip, sysInfo, emojiFlag };
};

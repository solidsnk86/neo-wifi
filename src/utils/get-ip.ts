export const getIP = async () => {
  const response = await fetch("https://solid-geolocation.vercel.app/location");
  const data = await response.json();
  const { ip, sysInfo, emojiFlag } = data;
  return { ip, sysInfo, emojiFlag };
};

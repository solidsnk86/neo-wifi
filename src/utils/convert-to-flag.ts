export const getCountryFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  if (!countryCode) return "🏳";
  return String.fromCodePoint(...codePoints);
};

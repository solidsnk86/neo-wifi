interface GeoResponse {
  ip: string;
  city: {
    name: string;
    postalCode: string;
  };
  country: {
    name: string;
    alpha: string;
    emojiFlag: string;
    timezone: string;
  };
  coords: {
    latitude: string;
    longitude: string;
  };
  sysInfo: {
    language: string;
    system: string;
    webBrowser: {
      browser: string;
      version: string;
    };
  };
}

export const getIP = async () => {
  try {
    const response = await fetch(
      "https://solid-geolocation.vercel.app/location"
    );
    const data: GeoResponse = await response.json();
    const { ip, sysInfo, country, city, coords } = data;
    const emojiFlag = country.emojiFlag;
    const cityName = city.name;
    const countryName = country.name;
    const { latitude, longitude } = coords
  
    return { ip, sysInfo, emojiFlag, cityName, countryName, latitude, longitude,  };
  } catch (err) {
    throw new Error("Cannot get data: ", err as TypeError);
  }
};

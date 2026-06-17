"use client";

import { GeoResponse } from "@/utils/get-ip";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ContextProps = {
  location: GeoResponse | null;
  isLoading: boolean;
  error: Error | TypeError | undefined;
  ipInfo: {
    ip: string;
    sysInfo: {
      language: string;
      system: string;
      webBrowser: {
        browser: string;
        version: string;
      };
    };
    emojiFlag: string;
    cityName: string;
    countryName: string;
    latitude: string;
    longitude: string;
    timeZoneCity: string;
  } | null;
};

export const LocationContext = createContext<ContextProps | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<GeoResponse | null>(null);
  const [error, setError] = useState<Error | TypeError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://solid-geolocation.vercel.app/location");
      const data = await res.json();
      setLocation(data);
    } catch (err) {
      console.error(err);
      setError(err as TypeError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const ipInfo = useMemo(() => {
    if (!location) return null;

    const { ip, sysInfo, country, city, coords } = location;
    const emojiFlag = country.emojiFlag;
    const cityName = city.name;
    const countryName = country.name;
    const timezone = country.timezone;
    const timeZoneCity = timezone.replace(/^[^/]+\/[^/]+\//, "");
    const { latitude, longitude } = coords;

    return {
      ip,
      sysInfo,
      emojiFlag,
      cityName,
      countryName,
      latitude,
      longitude,
      timezone,
      timeZoneCity,
    };
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, isLoading, error, ipInfo }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation debe estar dentro del provider");
  return ctx;
};

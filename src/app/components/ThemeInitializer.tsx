"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import { RootState } from "@/store";

export const ThemeInitializer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  const dispacth = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem("neo-wifi-theme");
    dispacth(setTheme(savedTheme === "true"));
  }, [dispacth]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return <>{children}</>;
};

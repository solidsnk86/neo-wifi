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
    const savedTheme = localStorage.getItem("theme");
    const isTrue = savedTheme === "true" ? true : false;
    if (isTrue) {
      dispacth(setTheme(isTrue));
    } else {
      dispacth(setTheme(isTrue));
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
};

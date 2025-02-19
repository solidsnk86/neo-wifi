"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import { Info, Menu, MoonStar, Share, Sun, X } from "lucide-react";
import { useState } from "react";
import styles from "./styles/navbar.module.css";
import { usePathname } from "next/navigation";
import { share } from "@/utils/share";
import NeoWifiCode from "../Footer/icon/NeoWifiCode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { RootState } from "@/store";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const navLinks = [
    { name: "Acerca", url: "/#about", icon: Info, ariaLabel: "Link acerca" },
    // {
    //   name: "Introducción",
    //   url: "/start/introduction",
    //   icon: File,
    //   ariaLabel: "Documentación",
    // },
    {
      name: "Compartir",
      url: "",
      fx: share,
      icon: Share,
      ariaLabel: "Compartir",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center md:px-6 px-4 relative w-full z-50">
      <Link
        href="/"
        className="flex gap-2 hover:scale-105 transition-transform duration-300 hover:drop-shadow-md"
      >
        <NeoWifiLogo className="cursor-pointer" width={150} height={56} />
      </Link>

      <div className="md:flex hidden items-center gap-8">
        {navLinks
          .filter((route) => route.url !== path)
          .map(({ url, name, ariaLabel, fx }) => (
            <Link
              href={url}
              key={name}
              className="flex items-center gap-2 hover:opacity-80"
              aria-label={ariaLabel}
              onClick={fx}
            >
              <span>{name}</span>
            </Link>
          ))}
        {darkMode ? (
          <Sun onClick={() => dispatch(toggleTheme())} />
        ) : (
          <MoonStar onClick={() => dispatch(toggleTheme())} />
        )}
      </div>

      <Menu
        className="md:hidden block cursor-pointer w-8 h-8"
        aria-label="Menú desplegable"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div className="fixed inset-0 bg-zinc-100/50 z-40" onClick={toggleMenu}>
          <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <X
              className="absolute top-4 right-4 w-8 h-8 hover:text-zinc-700 cursor-pointer z-50"
              onClick={toggleMenu}
            />

            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map(({ name, ariaLabel, icon: Icon, url, fx }) => (
                <ul key={name} className="w-16 text-left -translate-x-9">
                  <Link
                    href={url}
                    className="inline-flex items-center gap-3 text-2xl hover:text-zinc-700 transition-colors cursor-auto"
                    aria-label={ariaLabel}
                    onClick={name === "Compartir" ? fx : toggleMenu}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{name}</span>
                  </Link>
                </ul>
              ))}
              <footer className="absolute bottom-4">
                <div className="flex justify-center mx-auto my-4">
                  {darkMode ? (
                    <span
                      className="flex items-center gap-3 text-2xl"
                      onClick={() => dispatch(toggleTheme())}
                    >
                      <Sun />
                      Claro
                    </span>
                  ) : (
                    <span
                      className="flex items-center gap-3 text-2xl"
                      onClick={() => dispatch(toggleTheme())}
                    >
                      <MoonStar />
                      Oscuro
                    </span>
                  )}
                </div>
                <NeoWifiCode />
              </footer>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

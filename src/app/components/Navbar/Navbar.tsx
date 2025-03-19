"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import { MoonStar, Sun, X, AlignRight, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./styles/navbar.module.css";
import { usePathname } from "next/navigation";
import NeoWifiCode from "../Footer/icon/NeoWifiCode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { RootState } from "@/store";
import { navLinks, socialLinks } from "@/constants";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center md:px-6 px-4 fixed top-0 left-0 w-full z-[9999] backdrop-blur-xl bg-[#F5F5F5] dark:bg-zinc-900/50 border-b border-zinc-200/70 dark:border-zinc-800">
      <Link
        href="/"
        className="flex gap-2 hover:scale-105 transition-transform duration-300 hover:drop-shadow-md"
        title="Página principal"
        aria-label="Ir a la página principal"
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
              className={`flex items-center gap-2 hover:opacity-80 hover:text-yellow-300 transition-colors duration-300 ${styles.link}`}
              aria-label={ariaLabel}
              onClick={fx}
            >
              <span>{name}</span>
            </Link>
          ))}
        <aside
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1
            ${darkMode ? "bg-zinc-800" : "bg-[#EFF0F3]"}
            border border-zinc-300/30 dark:border-zinc-700/50
            shadow-sm hover:border-yellow-300 dark:hover:border-yellow-400/70`}
          onClick={() => dispatch(toggleTheme())}
          role="switch"
          aria-checked={darkMode}
          tabIndex={0}
          aria-label={
            darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
        >
          <div
            className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ease-in-out
            flex items-center justify-center
            shadow-md 
            ${
              darkMode
                ? "transform translate-x-8 bg-zinc-900 hover:border-red-400"
                : "bg-white"
            }`}
          >
            {darkMode ? (
              <MoonStar
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
              />
            ) : (
              <Sun
                className="w-4 h-4 text-yellow-400 fill-yellow-400"
                aria-hidden="true"
              />
            )}
          </div>
          <span className="sr-only">
            {darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          </span>
        </aside>
      </div>

      <AlignRight
        className="md:hidden block cursor-pointer w-8 h-8"
        aria-label="Menú desplegable"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div
          className="fixed inset-0 h-[100dvh] bg-zinc-500/80 dark:bg-zinc-900/80 z-50"
          onClick={toggleMenu}
        >
          <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
            <X
              className={`absolute top-4 right-4 w-8 h-8 hover:text-red-400/80 cursor-pointer z-50 ${styles.xEffect}`}
              onClick={toggleMenu}
            />

            <div className="flex flex-col w-full h-full pt-20">
              <article className="space-y-5">
                {navLinks.map(({ name, ariaLabel, icon: Icon, url, fx }) => (
                  <ul
                    key={name}
                    className="text-left border-b border-zinc-400/80 dark:border-zinc-800/80"
                  >
                    <Link
                      href={url}
                      className="flex items-center gap-3 text-2xl hover:opacity-75 transition-colors cursor-pointer p-3"
                      aria-label={ariaLabel}
                      onClick={name === "Compartir" ? fx : toggleMenu}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{name}</span>
                    </Link>
                  </ul>
                ))}
                <aside className="flex px-3 items-center gap-3">
                  <Palette className="w-6 h-6" />
                  <h3 className="text-2xl">
                    Apariencia: {darkMode ? "Oscuro" : "Claro"}
                  </h3>
                  <div
                    className={`relative w-16 h-8 rounded-full transition-colors duration-300 flex items-center px-1
                    ${darkMode ? "bg-zinc-800" : "bg-[#adafb4]"}
                    border border-zinc-300/30 dark:border-zinc-700/50
                    shadow-sm`}
                    onClick={() => dispatch(toggleTheme())}
                    role="switch"
                    aria-checked={darkMode}
                    tabIndex={0}
                    aria-label={
                      darkMode
                        ? "Cambiar a modo claro"
                        : "Cambiar a modo oscuro"
                    }
                  >
                    <div
                      className={`absolute w-6 h-6 rounded-full transition-transform duration-300 ease-in-out
                    flex items-center justify-center
                    shadow-md
                    ${
                      darkMode
                        ? "transform translate-x-8 bg-zinc-900"
                        : "bg-white"
                    }`}
                    >
                      {darkMode ? (
                        <MoonStar
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                        />
                      ) : (
                        <Sun
                          className="w-4 h-4 text-amber-500"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className="sr-only">
                      {darkMode
                        ? "Cambiar a modo claro"
                        : "Cambiar a modo oscuro"}
                    </span>
                  </div>
                </aside>
              </article>
              <footer className="absolute bottom-4 w-full">
                <aside className="flex justify-between pt-8 border-t border-zinc-400/80 dark:border-zinc-800/80 px-4">
                  {socialLinks.map(({ icon: Icon, url, ariaLabel }) => (
                    <Link
                      key={ariaLabel}
                      href={url}
                      aria-label={ariaLabel}
                      className="inline-flex"
                    >
                      <Icon />
                    </Link>
                  ))}
                </aside>
                <NeoWifiCode className="flex justify-center mx-auto mt-8" />
              </footer>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

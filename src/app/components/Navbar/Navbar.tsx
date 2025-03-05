"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import {
  Info,
  MoonStar,
  File,
  Share,
  Sun,
  X,
  // BookOpenText,
  AlignRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./styles/navbar.module.css";
import { usePathname } from "next/navigation";
import { share } from "@/utils/share";
import NeoWifiCode from "../Footer/icon/NeoWifiCode";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { RootState } from "@/store";
import { socialLinks } from "@/constants";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = usePathname();
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const navLinks = [
    { name: "Acerca", url: "/#about", icon: Info, ariaLabel: "Link acerca" },
    {
      name: "Introducción",
      url: "/start/introduction",
      icon: File,
      ariaLabel: "Documentación",
    },
    // {
    //   name: "Documentación",
    //   url: "/start/introduction",
    //   icon: BookOpenText,
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center md:px-6 px-4 fixed top-0 left-0 w-full z-50 bg-[#F5F5F5] dark:bg-[#111] border-b border-zinc-200/70 dark:border-zinc-800">
      <Link
        href="/"
        className="flex gap-2 hover:scale-105 transition-transform duration-300 hover:drop-shadow-md"
        title="Inicio"
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
              className="flex items-center gap-2 hover:opacity-80 hover:dark:text-[#a1ca63] hover:text-[#2B7097] transition-colors duration-300"
              aria-label={ariaLabel}
              onClick={fx}
            >
              <span>{name}</span>
            </Link>
          ))}
        {darkMode ? (
          <Sun
            aria-label="Cambiar a modo claro"
            className="cursor-pointer w-5 h-5 translate-y-[1px]"
            onClick={() => dispatch(toggleTheme())}
          />
        ) : (
          <MoonStar
            aria-label="Cambiar a modo oscuro"
            className="cursor-pointer w-5 h-5 translate-y-[1px]"
            onClick={() => dispatch(toggleTheme())}
          />
        )}
      </div>

      <AlignRight
        className="md:hidden block cursor-pointer w-8 h-8"
        aria-label="Menú desplegable"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900/50 z-40"
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
                {darkMode ? (
                  <span
                    className="flex items-center gap-3 text-2xl cursor-pointer px-3 hover:opacity-75"
                    onClick={() => dispatch(toggleTheme())}
                  >
                    <Sun />
                    Apariencia (claro)
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-3 text-2xl cursor-pointer px-3 hover:opacity-75"
                    onClick={() => dispatch(toggleTheme())}
                  >
                    <MoonStar />
                    Apariencia (oscuro)
                  </span>
                )}
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

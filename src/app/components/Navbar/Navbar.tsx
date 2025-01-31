"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import { Contact2, File, Info, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Acerca", url: "#about", icon: Info, ariaLabel: "Link acerca" },
    {
      name: "Contacto",
      url: "#contact",
      icon: Contact2,
      ariaLabel: "Contacto",
    },
    { name: "Docs", url: "/docs", icon: File, ariaLabel: "Documentación" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center md:px-6 px-4 relative w-full z-50">
      <Link
        href="/"
        className="flex gap-2 items-center hover:scale-105 transition-transform duration-300 hover:drop-shadow-md"
      >
        <NeoWifiLogo className="cursor-pointer md:w-[160px] md:h-[85px] w-[120px] h-[80px]" />
      </Link>

      <div className="md:flex hidden items-center gap-8">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              href={link.url}
              key={link.name}
              className="flex items-center gap-2 hover:opacity-80"
              aria-label={link.ariaLabel}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <Menu
        className="md:hidden block cursor-pointer"
        aria-label="Menú desplegable"
        onClick={toggleMenu}
      />

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 w-full h-full bg-white dark:bg-black/90 shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <X
              className="absolute top-4 right-4 w-8 h-8 hover:text-sky-400 cursor-pointer z-50"
              onClick={toggleMenu}
            />

            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map(({ name, ariaLabel, icon: Icon, url }) => (
                <Link
                  href={url}
                  key={name}
                  className="inline-flex items-center gap-3 text-2xl hover:text-sky-400 transition-colors"
                  aria-label={ariaLabel}
                  onClick={toggleMenu}
                >
                  <Icon className="w-6 h-6" />
                  <span>{name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

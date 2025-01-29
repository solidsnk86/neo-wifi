"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import { Contact2, File, Info, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [state, setDisplay] = useState("none");

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

  const openMenu = () => {
    setDisplay("block");
  };
  const closeMenu = () => {
    setDisplay("none");
  };
  return (
    <nav className="md:px-6 px-4 md:relative nav">
      <Link
        href="/"
        className="flex gap-2 items-center hover:scale-105 transition-transform duration-300 hover:drop-shadow-md"
      >
        <NeoWifiLogo className="cursor-pointer md:w-[160px] md:h-[85px] w-[120px] h-[80px]" />
      </Link>
      <aside className="md:flex hidden items-center gap-8">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div
              className="flex items-center gap-2 hover:opacity-80"
              key={link.name}
            >
              <Icon className="w-5 h-5" />
              <Link href={link.url} key={link.name}>
                {link.name}
              </Link>
            </div>
          );
        })}
      </aside>
      <Menu
        className="md:hidden flex cursor-pointer"
        aria-label="Menú despleglable"
        onClick={openMenu}
      />
      <div
        className="fixed top-0 left-0 w-full h-[100%] items-center"
        style={{ display: state }}
      >
        <section className="flex flex-col items-center h-screen bg-black/70 relative">
          <X
            className="w-8 h-8 absolute top-3 right-3 hover:text-sky-400 cursor-pointer"
            onClick={closeMenu}
          />
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <ul key={link.name} className="my-auto" onClick={closeMenu}>
                <li
                  className="inline-flex justify-center items-center gap-2 hover:opacity-80 text-2xl"
                  aria-label={link.ariaLabel}
                >
                  <Icon className="" />
                  <Link href={link.url} key={link.name}>
                    {link.name}
                  </Link>
                </li>
              </ul>
            );
          })}
        </section>
      </div>
    </nav>
  );
};

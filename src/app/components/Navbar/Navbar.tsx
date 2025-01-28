"use client";

import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";
import { Contact2, File, Info, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [state, setDisplay] = useState("none");

  const navLinks = [
    { name: "Acerca", url: "#about", icon: Info },
    { name: "Contacto", url: "#contact", icon: Contact2 },
    { name: "Docs", url: "/docs", icon: File },
  ];

  const openMenu = () => {
    setDisplay("block");
  };
  const closeMenu = () => {
    setDisplay("none");
  };
  return (
    <nav className="w-full h-14 flex items-center md:px-6 px-4 md:relative justify-between z-50 fixed top-0 left-0">
      <Link
        href="/"
        className="flex gap-2 items-center hover:scale-105 transition-transform duration-300"
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
      <Menu className="md:hidden flex" onClick={openMenu} />
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black/70 items-center z-50"
        style={{ display: state }}
      >
        <X className="absolute top-3 right-3 w-8 h-8" onClick={closeMenu} />
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div
              className="flex justify-center gap-2 hover:opacity-80 text-2xl"
              key={link.name}
            >
              <Icon className="" />
              <Link href={link.url} key={link.name}>
                {link.name}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

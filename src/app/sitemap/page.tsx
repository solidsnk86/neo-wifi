"use client";

import {
  Bug,
  Contact2,
  DownloadCloud,
  Home,
  Info,
  Settings,
  SquareMousePointer,
  SquarePlay,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "../components";
import MouseTrail from "../components/MouseTrail";

const mapSites = [
  { name: "Página de Inicio", icon: Home, url: "/" },
  { name: "Sobre Nosotros", icon: Info, url: "/#about" },
  {
    name: "Servicios",
    icon: Settings,
    url: "https://calcagni-gabriel.vercel.app",
  },
  { name: "Descargas", icon: DownloadCloud, url: "/download" },
  {
    name: "Uso de la app",
    icon: SquareMousePointer,
    url: "/start/introduction",
  },
  {
    name: "Bugs",
    url: "https://github.com/solidsnk86/neo-wifi/issues/new",
    icon: Bug,
  },
  {
    name: "Tutoriales",
    icon: SquarePlay,
    url: "https://www.youtube.com/@tutosNeoTecs",
  },
  { name: "Contacto", icon: Contact2, url: "mailto:tutosneotecs@gmail.com" },
];

export default function Page() {
  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200 h-[100dvh]">
      <MouseTrail />
      <Navbar />
      <section style={{ padding: "2rem" }} className="">
        <h1 className="flex justify-center mx-auto text-4xl font-bold pt-16">
          Mapa del Sitio
        </h1>

        <aside className="grid xl:grid-cols-4 grid-cols-2 gap-2 my-16">
          {mapSites.map(({ name, url, icon: Icon }) => (
            <Link
              key={name}
              href={url}
              className="p-4 bg-[#FFFFFF] dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-800/50 flex justify-center items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 backdrop-blur-xl hover:scale-[1.02] duration-300 z-50"
            >
              <Icon />
              <p>{name}</p>
            </Link>
          ))}
        </aside>
      </section>
    </main>
  );
}

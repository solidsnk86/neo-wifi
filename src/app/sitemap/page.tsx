import {
  Contact2,
  Home,
  Info,
  Settings,
  SquareMousePointer,
  SquarePlay,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "../components";

const mapSites = [
  { name: "Página de Inicio", icon: Home, url: "/" },
  { name: "Sobre Nosotros", icon: Info, url: "/#about" },
  { name: "Servicios", icon: Settings, url: "/services" },
  {
    name: "Uso de la app",
    icon: SquareMousePointer,
    url: "/start/introduction",
  },
  {
    name: "Tutoriales",
    icon: SquarePlay,
    url: "https://www.youtube.com/@tutosNeoTecs",
  },
  { name: "Contacto", icon: Contact2, url: "mailto:tutosneotecs@gmail.com" },
];

export default function Sitemap() {
  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200 h-[100dvh]">
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
              className="p-4 bg-[#FFFFFF] dark:bg-zinc-800/50 border border-zinc-200/70 dark:border-zinc-800 flex justify-center items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
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

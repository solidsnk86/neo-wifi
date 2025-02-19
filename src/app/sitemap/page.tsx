import {
  Contact2,
  Home,
  Info,
  Settings,
  SquareMousePointer,
  SquarePlay,
} from "lucide-react";
import Link from "next/link";

const mapSites = [
  { name: "Página de Inicio", icon: Home },
  { name: "Sobre Nosotros", icon: Info },
  { name: "Servicios", icon: Settings },
  { name: "Cómo usar la app", icon: SquareMousePointer },
  { name: "Tutoriales", icon: SquarePlay },
  { name: "Contacto", icon: Contact2 },
];

export default function Sitemap() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 className="flex justify-center mx-auto text-4xl font-bold">
        Mapa del Sitio
      </h1>

      <aside className="grid grid-cols-4 gap-2 my-16">
        {mapSites.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            href="/"
            className="p-4 bg-zinc-800/50 border border-zinc-800 flex justify-center items-center gap-2"
          >
            <Icon />
            <p>{name}</p>
          </Link>
        ))}
      </aside>
    </main>
  );
}

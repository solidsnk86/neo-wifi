import Link from "next/link";
import NeoWifiCode from "./icon/NeoWifiCode";

const footerLinks = [
  { name: "Privacidad", url: "/privacy" },
  { name: "Políticas", url: "/policies" },
  { name: "Contacto", url: "mailto:tutosneotecs@gmail.com" },
  { name: "Desarrollador", url: "https://githhub.com/solidsnk86" },
];

export const Footer = () => {
  return (
    <footer className="grid mx-auto mt-40 mb-2 relative">
      <NeoWifiCode width={160} height={85} className="mx-auto" />
      <div className="w-full flex justify-evenly my-10 px-16">
        {footerLinks.map((link) => (
          <Link
            href={link.url}
            key={link.name}
            className="cursor-pointer hover:opacity-50"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <small className="text-center">
        &copy; Neo-Wifi {new Date().getFullYear()} • Todos los derechos
        reservados
      </small>
    </footer>
  );
};

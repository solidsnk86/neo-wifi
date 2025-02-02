import Link from "next/link";
import { Instagram, Twitter, Github, Linkedin } from "lucide-react";

const categories = [
  { name: "Windows", url: "#" },
  { name: "MacOS", url: "#" },
  { name: "Redes WiFi", url: "https://wifi.sanluis.gov.ar/#" },
  { name: "Tutoriales", url: "https://neotecs.vercel.app" },
];

const quickLinks = [
  { name: "Contacto", url: "mailto:tutosneotecs@gmail.com" },
  { name: "Descargas", url: "#" },
  { name: "Política de Privacidad", url: "/policies" },
  { name: "Mapa del Sitio", url: "#" },
];

const socialLinks = [
  {
    icon: Instagram,
    url: "https://www.instagram.com/calcagnigabriel/",
    ariaLabel: "Instagram",
  },
  { icon: Twitter, url: "https://x.com/CalcagniGabriel", ariaLabel: "Twitter" },
  { icon: Github, url: "https://github.com/solidsnk86/", ariaLabel: "Github" },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/gabriel-calcagni/",
    ariaLabel: "LinkedIn",
  },
];

export const Footer = () => {
  return (
    <footer className="text-gray-400 pt-12 pb-8 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4" id="about">
              ACERCA DE
            </h3>
            <p className="text-sm leading-relaxed">
              Neo-Wifi es una aplicación especializada que proporciona
              información detallada sobre las redes inalámbricas del gobierno de
              la provincia de San Luis, Argentina. Ofrecemos una herramienta
              automatizada para PC que simplifica la configuración de CPE
              TP-Link, implementando cálculos precisos de distancia mediante la
              fórmula de Haversine para optimizar las conexiones inalámbricas.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              CATEGORÍAS
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.url}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              ENLACES RÁPIDOS
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              Copyright © {new Date().getFullYear()} • Todos los derechos
              reservados Neo-Wifi
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url, ariaLabel }) => (
                <Link
                  key={ariaLabel}
                  href={url}
                  aria-label={ariaLabel}
                  className="hover:text-white transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

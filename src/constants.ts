import { Instagram, Linkedin, Github } from "lucide-react";
import { XIcon } from "./app/components/Icons/XIcon";

export const categories = [
  { name: "Windows", url: "/download" },
  { name: "MacOS", url: "/download" },
  { name: "Redes WiFi", url: "https://wifi.sanluis.gov.ar/#" },
  { name: "Tutoriales", url: "https://neotecs.vercel.app" },
];

export const quickLinks = [
  { name: "Contacto", url: "mailto:tutosneotecs@gmail.com" },
  { name: "Descargas", url: "/download" },
  { name: "Política de Privacidad", url: "/policies" },
  { name: "Mapa del Sitio", url: "/sitemap" },
];

export const socialLinks = [
  {
    icon: Instagram,
    url: "https://www.instagram.com/calcagnigabriel/",
    ariaLabel: "Instagram",
  },
  { icon: XIcon, url: "https://x.com/CalcagniGabriel", ariaLabel: "Twitter" },
  { icon: Github, url: "https://github.com/solidsnk86/", ariaLabel: "Github" },
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/gabriel-calcagni/",
    ariaLabel: "LinkedIn",
  },
];

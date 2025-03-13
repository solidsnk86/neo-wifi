import {
  Instagram,
  Linkedin,
  Github,
  Link2,
  Share,
  Facebook,
  BookOpenText,
  Info,
} from "lucide-react";
import { XIcon } from "./app/components/Icons/XIcon";
import { showDialog } from "./utils/dialog";
import { share } from "./utils/share";
import { WhatsAppIcon } from "./app/components/Icons/WhatsAppIcon";
import styles from "@/app/components/Navbar/styles/navbar.module.css";

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

export const navLinks = [
  { name: "Acerca", url: "/#about", icon: Info, ariaLabel: "Link acerca" },
  {
    name: "Documentación",
    url: "/start/introduction",
    icon: BookOpenText,
    ariaLabel: "Documentación",
  },
  {
    name: "Compartir",
    url: "",
    fx: () => {
      showDialog({
        content: (
          <div className="p-6 flex gap-3 items-center w-fit justify-center">
            <h3>Compartir mediante:</h3>
            <span className={styles.span} title="Copiar Link">
              <Link2 onClick={share.copyUrl} />
            </span>
            <span className={styles.span} title="Compartir">
              <Share onClick={share.navigatorShare} />
            </span>
            <span className={styles.span} title="Compartir en Facebook">
              <Facebook onClick={share.facebook} />
            </span>
            <span className={styles.span} title="Compartir en LinkedIn">
              <Linkedin onClick={share.linkedIn} />
            </span>
            <span className={styles.span} title="Compartir en Twitter">
              <XIcon onClick={share.x} />
            </span>
            <span className={styles.span} title="Compartir en WhatsApp">
              <WhatsAppIcon onClick={share.whatsApp} width={24} height={24} />
            </span>
          </div>
        ),
      });
    },
    icon: Share,
    ariaLabel: "Compartir",
  },
];

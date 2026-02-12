"use client";

import Link from "next/link";
import { categories, quickLinks, socialLinks } from "@/constants";

export const Footer = () => {
  return (
    <footer className="text-zinc-900 dark:text-zinc-200 border-t dark:border-zinc-800/50 border-zinc-300/70 rounded-2xl pt-12 pb-8 relative z-20 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4" id="about">
              ACERCA DE
            </h3>
            <p className="text-sm leading-relaxed">
              Neo-Wifi es una aplicación especializada que proporciona
              información detallada sobre las redes inalámbricas del gobierno de
              la provincia de San Luis, Argentina. Ofrecemos una herramienta
              automatizada para PC que simplifica la configuración de los
              modelos CPE de TP-Link, implementando cálculos precisos de
              distancia mediante la fórmula de Haversine para optimizar las
              conexiones inalámbricas.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">CATEGORÍAS</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.url}
                    className="text-sm hover:underline transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">ENLACES RÁPIDOS</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    className="text-sm hover:underline transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-300 dark:border-zinc-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-2 items-center mb-4 md:mb-0">
              <p className="text-sm">
                Neo-Wifi © {new Date().getFullYear()} • Todos los derechos
                reservados
              </p>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url, ariaLabel }) => (
                <Link
                  key={ariaLabel}
                  href={url}
                  aria-label={ariaLabel}
                  className="hover:opacity-75 hover:scale-110 transition-transform duration-200"
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

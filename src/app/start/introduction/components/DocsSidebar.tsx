"use client";

import { useState, useEffect } from "react";
import { X, Menu, BookOpen, ChevronRight } from "lucide-react";

const navItems = [
  { id: "introduccion", label: "Introducción" },
  { id: "primeros-pasos", label: "Primeros pasos" },
  { id: "indicadores-led", label: "Indicadores LED" },
  { id: "descarga-instalacion", label: "Descarga e Instalación" },
  { id: "primera-ejecucion", label: "Primera Ejecución" },
  { id: "uso-coordenadas", label: "Uso de Coordenadas" },
  { id: "geolocalizacion", label: "Geolocalización" },
  { id: "coordenadas-app", label: "Coordenadas en la App" },
  { id: "video", label: "Video Tutorial" },
];

function SidebarContent({
  activeId,
  onClose,
}: {
  activeId: string;
  onClose?: () => void;
}) {
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose?.();
  };

  return (
    <nav className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-zinc-200 dark:border-zinc-800">
        <BookOpen size={18} className="text-yellow-500" />
        <span className="font-semibold text-sm tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
          Documentación
        </span>
      </div>
      <ul className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 font-medium"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
              >
                {isActive && (
                  <ChevronRight size={14} className="text-yellow-500 shrink-0" />
                )}
                {!isActive && <span className="w-[14px] shrink-0" />}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DocsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("introduccion");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Botón mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 shadow-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-yellow-400/60 transition-colors"
        aria-label="Abrir menú de documentación"
      >
        <Menu size={16} />
        <span>Menú</span>
      </button>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 sticky top-14 h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl">
        <SidebarContent activeId={activeId} />
      </aside>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer mobile */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-[9999] w-72 bg-white dark:bg-[#111] border-r border-zinc-200 dark:border-zinc-800 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
        <SidebarContent activeId={activeId} onClose={() => setIsOpen(false)} />
      </aside>
    </>
  );
}

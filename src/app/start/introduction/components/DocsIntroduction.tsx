import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export const DocsIntroduction = () => {
  const articleRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.set(articleRef.current, { visibility: "visible" });
    const tl = gsap.timeline();
    tl.from(articleRef.current, {
      y: 150,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out",
    }).to(articleRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <article
      ref={articleRef}
      className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 flex justify-center mx-auto flex-col my-6 p-6 relative max-w-3xl backdrop-blur-xl z-50"
    >
      <p>
        Bienvenido a esta aplicación de configuración automatizada para
        dispositivos TP-Link.
      </p>
      <p>
        Esta herramienta de escritorio ha sido diseñada para simplificar y
        agilizar la configuración de CPE inalámbricos y routers de la marca
        TP-Link, permitiendo a los usuarios optimizar sus dispositivos de red
        con solo unos clics.
      </p>
      <p>
        Con una interfaz intuitiva y funcionalidades avanzadas, la aplicación
        elimina la necesidad de configuraciones manuales complejas, reduciendo
        errores y mejorando la eficiencia en la instalación. Ya sea para
        despliegues individuales o configuraciones masivas, esta solución ofrece
        una manera rápida, segura y eficaz de ajustar los parámetros esenciales
        de los dispositivos, garantizando una conectividad estable y optimizada.
        Cabe destacar que la posición de la antena (CPE) debe ser ajustada por
        el mismo usuario.
      </p>
    </article>
  );
};

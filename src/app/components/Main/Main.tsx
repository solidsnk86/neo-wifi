import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const Main = () => {
  return (
    <main className="p-4">
      <article className="p-6 border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 rounded-2xl relative overflow-hidden">
        <h2
          title="Información válida para la provincia de San Luis"
          className="font-semibold text-lg md:text-2xl py-3 px-3 items-center flex gap-2 justify-center mb-4"
        >
          <AlertCircle className="w-10 h-10 py-1 px-2 text-amber-300 border border-slate-700/50 rounded-xl bg-gradient-to-b from-blue-400/10 to-slate-500/10" />
          Información
        </h2>
        <p>
          Este servicio incluye una herramienta de escritorio que automatiza la
          configuración de tu red WiFi. Actualmente disponible para Windows y
          exclusiva para ciertas localidades de San Luis, con planes de
          expansión a más zonas próximamente.
        </p>
        <p>Tienes que seguir los siguientes pasos:</p>
        <ol className="list-decimal ml-4 space-y-2 mt-3">
          <li>
            <b>Leer la Documentación</b> que se encuentra disponible{" "}
            <Link
              href="/start/introduction"
              className="underline text-blue-400"
            >
              aquí
            </Link>{" "}
            en esta plataforma.
          </li>
          <li>
            <b>Descargar e instalar</b> la aplicación en tu computadora Windows.
          </li>
          <li>
            <b>Ingresar</b> la latitud y longitud de tu psosición geográfica que
            se proporciona en esta plataforma.
          </li>
          <li>
            <b>Configurar</b> tu CPE (Equipo de Premisa del Cliente) de manera
            rápida y sencilla. Por el momento la configuración es para
            implementos de la siguiente marca y modelos:
          </li>
        </ol>
        <aside className="my-4 space-y-3">
          <div className="flex items-center justify-center">
            <Link href="https://www.tp-link.com/">
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src="/tp-link_gray.png"
                width={160}
                height={80}
                alt="Tp Link Logo"
                className="hover:opacity-70 cursor-pointer"
              />
            </Link>

            <Link href="https://www.tp-link.com/ar/business-networking/all-soho/#soho-soho-pharos-cpe">
              {/*eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src="/pharos.svg"
                width={160}
                height={80}
                alt="Tp Link Logo"
                className="hover:opacity-70 cursor-pointer"
              />
            </Link>
          </div>
          <code className="flex justify-center w-fit text-xs md:text-sm mx-auto border border-slate-700/50 bg-gradient-to-b from-blue-400/10 to-slate-500/10 px-2 py-[2px] rounded-md">
            CPE710 - CPE610 - CPE510 - CPE220 - CPE210
          </code>
        </aside>
      </article>
    </main>
  );
};

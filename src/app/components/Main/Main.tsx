import { DownloadButton } from "../DownloadButton/DownloadButton";

export const Main = () => {
  return (
    <main className="p-4">
      <article className="p-6 border border-slate-800 rounded-2xl relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bg.png"
          width="100%"
          height="100%"
          alt="Bg effect"
          className="absolute top-0 left-0 opacity-40"
        />
        <p>
          Este servicio incluye una herramienta que automatiza la configuración
          de tu red WiFi. Solo necesitas seguir estos sencillos pasos:
        </p>
        <ol className="list-decimal ml-4 my-2">
          <li>
            <b>Descargar e instalar</b> la aplicación en tu computadora.
          </li>
          <li>
            <b>Ingresar</b> la longitud y latitud que se proporciona en esta
            plataforma.
          </li>
          <li>
            <b>Configurar</b> tu CPE (Equipo de Premisa del Cliente) de manera
            rápida y sencilla.
          </li>
        </ol>
        <DownloadButton />
      </article>
    </main>
  );
};

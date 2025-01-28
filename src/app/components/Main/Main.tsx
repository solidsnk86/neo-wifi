import { DownloadButton } from "../DownloadButton/DownloadButton";

export const Main = () => {
  return (
    <main className="p-4">
      <article className="p-6 bg-gradient-to-b from-blue-300/10 to-slate-600/10 border border-slate-800 rounded-2xl">
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

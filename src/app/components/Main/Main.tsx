export const Main = () => {
  return (
    <main className="p-4">
      <article className="p-6 border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 rounded-2xl relative overflow-hidden">
        <p>
          Este servicio incluye una herramienta de escritorio que automatiza la
          configuración de tu red WiFi. Actualmente disponible para Windows y
          exclusiva para ciertas localidades de San Luis, con planes de
          expansión a más zonas próximamente.
        </p>
        <p>Tienes que seguir los siguientes pasos:</p>
        <ol className="list-decimal ml-4 space-y-2 mt-3">
          <li>
            <b>Leer Documentación</b> que se encuentra disponible en esta
            plataforma.
          </li>
          <li>
            <b>Descargar e instalar</b> la aplicación en tu computadora Windows.
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
      </article>
    </main>
  );
};

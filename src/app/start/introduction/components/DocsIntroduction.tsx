export const DocsIntroduction = () => {
  return (
    <article className="border border-zinc-200/70 dark:border-zinc-800 rounded-xl bg-gradient-to-br bg-[#ffffff] dark:bg-zinc-900/90 flex justify-center mx-auto flex-col my-6 p-6 relative max-w-3xl backdrop-blur-xl overflow-hidden z-50 dark:text-zinc-400">
      <div className="absolute top-3 left-20 w-24 h-24 bg-white/50 blur-[50px] rounded-full" />
      <p>
        Aplicación de escritorio para configurar de forma rápida y automatizada
        dispositivos TP-Link como CPEs y routers.
      </p>
      <p>
        Permite realizar configuraciones individuales o masivas mediante una
        interfaz simple, reduciendo errores y tiempo de instalación.
      </p>
      <p>
        La orientación física de la antena (CPE) debe ajustarse manualmente para
        obtener el mejor rendimiento de la conexión.
      </p>
    </article>
  );
};

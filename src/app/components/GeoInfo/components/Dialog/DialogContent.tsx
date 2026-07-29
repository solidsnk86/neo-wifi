import { BadgeInfo, LocateFixed } from "lucide-react";

const mainContent = `Si deseas conocer tu ubicación y obtener información sobre las antenas
                    📡 WiFi más cercanas, puedes habilitar la geolocalización de tu
                    dispositivo. Así podrás ver detalles adicionales y descubrir a qué
                    distancia te encuentras de la más próxima.`

export const DialogContent = ({ content = mainContent, handler }: { content?: string; handler: () => void }) => {
  return (
    <article className="shadow-md">
      <div className="border-b-[6px] border-zinc-300 dark:border-zinc-950 rounded-xl p-3">
        <h2 className="text-2xl font-semibold flex justify-center mx-auto items-center gap-3">
          <BadgeInfo size={22} className="text-blue-500" />
          Información
        </h2>
        <p className="my-4 text-pretty text-zinc-600 dark:text-zinc-400">
          {content}
        </p>
        <div className="relative w-fit justify-center mx-auto group">
          <button
            className="flex mx-auto w-fit gap-2 items-center justify-center p-3 bg-linear-to-b from-zinc-950 to-zinc-800 text-zinc-50 rounded-md border border-zinc-300/70 dark:border-zinc-800/50 backdrop-blur-xl transition-transform outline-1 outline-zinc-300/70 dark:outline-zinc-800/50 outline-offset-3 hover:opacity-80"
            onClick={handler}
          >
            <LocateFixed size={20} className="text-red-400" />
            Obtener Ubicación
          </button>
        </div>
      </div>
    </article>
  );
};

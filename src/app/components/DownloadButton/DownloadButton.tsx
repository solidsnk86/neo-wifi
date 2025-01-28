import { Rocket } from "lucide-react";

export const DownloadButton = () => {
  return (
    <button
      className={`px-8 py-4 flex justify-center mx-auto mt-10 border border-slate-800 bg-slate-800/50 relative 
        hover:scale-105 transition-transform duration-200 hover:brightness-125 shadow-lg
        cursor-pointer        
        `}
    >
      <a
        href=""
        className="flex items-center gap-3 font-semibold text-lg"
        download="/file/program.exe"
      >
        <Rocket /> Descargar
      </a>
    </button>
  );
};

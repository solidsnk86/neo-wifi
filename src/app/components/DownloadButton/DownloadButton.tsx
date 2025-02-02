import { Download } from "lucide-react";
import { ComponentProps } from "react";

export const DownloadButton = (props: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <a
        href=""
        className="flex items-center gap-3 font-semibold text-lg"
        download="/file/program.exe"
      >
        <Download /> Descargar
      </a>
    </button>
  );
};

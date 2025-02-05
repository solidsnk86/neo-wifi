import { Download } from "lucide-react";
import { ComponentProps } from "react";

export const DownloadButton = (props: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <a
        href="https://mpago.la/2S6wLtV"
        className="flex items-center gap-3 font-semibold text-lg"
      >
        <Download /> Descargar
      </a>
    </button>
  );
};

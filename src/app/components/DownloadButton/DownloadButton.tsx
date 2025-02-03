import { Download } from "lucide-react";
import { ComponentProps } from "react";

export const DownloadButton = (props: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <a
        href="https://link.mercadopago.com.ar/neotecs"
        className="flex items-center gap-3 font-semibold text-lg"
      >
        <Download /> Descargar
      </a>
    </button>
  );
};

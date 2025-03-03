import { Download } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export const DownloadButton = (props: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <Link
        href="/download"
        className="flex items-center gap-3 font-semibold text-lg"
      >
        <Download /> Descargar
      </Link>
    </button>
  );
};

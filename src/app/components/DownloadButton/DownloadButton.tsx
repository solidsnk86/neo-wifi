import Link from "next/link";
import { ComponentProps } from "react";
import { WindowsLogo } from "./Icon/WindowsLogo";

export const DownloadButton = (props: ComponentProps<"button">) => {
  return (
    <button {...props}>
      <Link
        href="/download"
        className="flex items-center gap-3 font-semibold text-lg"
      >
        <WindowsLogo width={24} height={24} color="#ddd" />
        Descarga
      </Link>
    </button>
  );
};

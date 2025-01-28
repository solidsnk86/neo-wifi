import Link from "next/link";
import NeoWifiLogo from "./Icon/NeoWifiLogo";

export const Navbar = () => {
  return (
    <nav className="w-full h-14 flex items-center px-4 relative">
      <Link
        href="/"
        className="flex gap-2 items-center hover:scale-105 relative"
      >
        <NeoWifiLogo width={160} height={85} className="cursor-pointer" />
      </Link>
    </nav>
  );
};

import NeoWifiLogo from "./Icon/NeoWifiLogo";

export const Navbar = () => {
  return (
    <nav className="w-full h-14 flex items-center px-2">
      <div className="flex gap-2 items-center">
        <NeoWifiLogo width={120} height={65} />
      </div>
    </nav>
  );
};

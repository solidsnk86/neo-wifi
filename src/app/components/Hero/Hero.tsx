import NeoWifiLogo from "../Navbar/Icon/NeoWifiLogo";

export const Hero = () => {
  return (
    <div className="w-full px-4 mx-auto justify-center">
      <NeoWifiLogo className="w-[260px] md:w-max" />
      <div>
        <p className="my-6">
          ¡Bienvenid@s! Esta aplicación ha sido diseñada y desarrollada para
          brindar información sobre las antenas inalámbricas del gobierno de la
          provincia de San Luis, con el objetivo de facilitar la configuración
          efectiva de redes inalámbricas.
        </p>
      </div>
    </div>
  );
};

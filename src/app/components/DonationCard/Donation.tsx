import Link from "next/link";
import { CoffeeIcon } from "./CoffeeIcon";

export const Donation = () => {
  return (
    <Link
      className={`w-fit border border-zinc-200/70 dark:border-zinc-800/50 p-3 my-16 rounded-[14px] flex justify-center mx-auto hover:scale-110 
        items-center cursor-pointer gap-2 bg-[#ffffff] hover:shadow-lg dark:bg-zinc-800/50 relative dark:hover:brightness-125 transition-all duration-300`}
      href="https://link.mercadopago.com.ar/neotecs"
    >
      <CoffeeIcon
        className="w-10 h-10 flex justify-center mx-auto py-1 px-2 border border-amber-300/50 rounded-xl bg-amber-200/30"
        fill="#F2BB13"
      />
      <div className="flex flex-col leading-tight font-semibold p-1">
        <small className="text-center">Invítame un café!!</small>
        <small>¿Me ayudas a seguir creando soluciones?</small>
      </div>
    </Link>
  );
};

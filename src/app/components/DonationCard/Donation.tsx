import Link from "next/link";
import { CoffeeIcon } from "./CoffeeIcon";

export const Donation = ({ content }: { content: string }) => {
  return (
    <Link
      className={`w-fit border border-zinc-200/70 dark:border-zinc-800/50 p-3 my-16 rounded-[14px] flex justify-center mx-auto hover:scale-110 hover:dark:border-yellow-300/30 z-50 backdrop-blur-lg
        items-center cursor-pointer gap-2 bg-[#ffffff] hover:shadow-lg dark:bg-zinc-800/50 relative dark:hover:brightness-125 transition-all duration-300`}
      href="https://cafecito.app/neowifi"
      rel="noopener"
      target="_blank"
    >
      <CoffeeIcon
        className="w-10 h-10 flex justify-center mx-auto py-1 px-2 border border-yellow-300/50 rounded-xl bg-yellow-200/30"
        fill="#facc15"
      />
      <div className="flex flex-col leading-tight font-semibold p-1">
        <small className="text-center">Invíta un cafecito!!</small>
        <small>{content}</small>
      </div>
    </Link>
  );
};

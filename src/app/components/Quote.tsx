import { QuoteIcon } from "lucide-react";
import Image from "next/image";

export default function Quote() {
  return (
    <section className="flex mx-auto px-3 max-w-3xl">
      <div className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 z-50 backdrop-blur-xl">
        <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
          <p className="relative flex text-center text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-400">
            <QuoteIcon className="rotate-180 text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
            Creo que el acceso a una conexión a Internet estable y segura es un
            derecho para todos. Quiero ayudar a potenciar la conectividad y
            hacer de esta misión una realidad. ¡Vamos por ello! 😃
            <QuoteIcon className=" text-zinc-400/70 dark:text-zinc-800 w-10 h-10 fill-yellow-300" />
          </p>
          <aside className="flex justify-center items-center gap-3 mt-4">
            <Image
              src="/avatar-personal.jpg"
              width={45}
              height={45}
              alt="Avatar Gabriel"
              className="rounded-full border-2 border-[#4E4E4E] outline-[1px] outline-double outline-black"
            />
            <div className="flex flex-col font-semibold text-zinc-600">
              <span>Gabriel, desarrollador</span>
              <span>de Neo-WiFi</span>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}

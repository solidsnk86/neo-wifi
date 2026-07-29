import { QuoteIcon } from "lucide-react";
import Image from "next/image";

export default function Quote() {
  return (
    <section className="flex mx-auto px-3 max-w-3xl my-14">
      <div className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-2xl bg-[#FFFFFF] dark:bg-[#181818] z-50 backdrop-blur-xl relative">
        <article className="border-b-4 border-zinc-300 dark:border-[#111111] rounded-[14px] p-3">
          <p className="relative flex text-center text-base md:text-lg text-zinc-900 dark:text-zinc-400 italic">
            Creo que el acceso a una conexión a Internet estable y segura es un
            derecho para todos. Quiero ayudar a potenciar la conectividad y
            hacer de esta misión una realidad. ¡Vamos por ello!
          </p>
          <aside className="flex justify-center items-center gap-3 mt-4">
            <Image
              src="/avatar-personal.jpg"
              width={40}
              height={40}
              alt="Avatar Gabriel"
              className="rounded-full border-2 border-zinc-300 dark:border-zinc-500 outline-[1px] outline-offset-1 outline-double outline-zinc-400 select-none"
            />
            <div className="flex flex-col text-zinc-500">
              <span>Gabriel, desarrollador</span>
              <span>de Neo-WiFi</span>
            </div>
          </aside>
        </article>
      </div>
    </section>
  );
}

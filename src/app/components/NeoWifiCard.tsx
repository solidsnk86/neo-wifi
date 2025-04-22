import Image from "next/image";
import { HomeBlock } from "./BlockComp";
import { Power } from "lucide-react";
import { BenQIcon } from "./Icons/BenqIcon";
import { WindowsLogo } from "./DownloadButton/Icon/WindowsLogo";
import Link from "next/link";

export default function NeoWifiAppCard() {
  return (
    <HomeBlock>
      <div className="flex flex-col md:flex-row items-center p-8 relative rounded-2xl border-2 border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-800/50 backdrop-blur-lg transition-all">
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
          <h2 className="text-pretty text-2xl md:text-3xl font-bold mb-4 font-['bogue-black']">
            Obtén la app Neo WiFi
          </h2>
          <p className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-400 mb-6">
            Descargá la aplicación ahora para automatizar la configuración de
            cualquier modelo CPE de TP-Link, incluyendo también algunos routers
            de la misma marca. Rápido, fácil y sin complicaciones.
          </p>
          <Link
            href="/download"
            className="flex justify-center items-center gap-2 p-6 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-semibold rounded-3xl text-xl hover:opacity-85"
          >
            <WindowsLogo width={24} height={24} className="inline" />
            Descarga para Windows
          </Link>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex flex-col justify-center relative">
          <div className="bg-zinc-200 dark:bg-zinc-900 pt-2 px-2 pb-4 rounded shadow-xl border-x border-t border-zinc-300 dark:border-zinc-800">
            <div className="bg-black overflow-hidden">
              <Image
                src="/neo.wifi-app-v1.2.4.png"
                width={400}
                height={300}
                alt="Neo WiFi App Mockup"
                className="block w-full"
              />
            </div>
          </div>

          <div className="relative flex flex-col items-center">
            <div className="absolute -top-3 left-1/2 -translate-x-[50%] bg-zinc-300 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-full w-3 h-3 justify-center items-center flex outline outline-1 outline-red-500/30">
              <Power className="w-[6px] h-[6px] text-green-600" />
            </div>
            <BenQIcon
              width={24}
              height={12}
              fill="#333"
              className="absolute -top-[14px] left-3"
            />
            <div className="h-1 w-16 bg-zinc-200 dark:bg-zinc-900 rounded-full" />
            <div className="border-t-[12px] border-x-[24px] border-b-[24px] border-zinc-200 dark:border-zinc-950/30" />
            <div className="h-2 w-48 bg-zinc-200 dark:bg-zinc-900 rounded-sm border-t border-zinc-300 dark:border-zinc-800" />
          </div>
        </div>
      </div>
    </HomeBlock>
  );
}

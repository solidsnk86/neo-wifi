"use client";

import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import { useCallback, useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import styles from "./styles/button.module.css";
import {
  Activity,
  CheckCircle,
  FileArchive,
  FileBox,
  FileDown,
  FilePenIcon,
  FileText,
} from "lucide-react";
import { DownloadsProps } from "@/types/definitions";
import { HomeBlock, HomeBlockTitle } from "../components/BlockComp";
import Link from "next/link";
import { CurveArrowIcon } from "./Icons/ArrowIcon";
import { YouTubeLiteVideo } from "../components/YoutubeVideo";
import MouseTrail from "../components/MouseTrail";
import { WindowsLogo } from "../components/DownloadButton/Icon/WindowsLogo";

export default function Page() {
  const [downloads, setDownloads] = useState<DownloadsProps>();
  const [downloadComplete, setDownloadComplete] = useState(false);

  const sendDataToSupabase = useCallback(async () => {
    const [ipInfo] = await Promise.all([getIP()]);
    const objDownload = {
      ip: ipInfo.ip,
      city: ipInfo.cityName,
      so: ipInfo.sysInfo.system,
      browser: ipInfo.sysInfo.webBrowser.browser,
    };
    await SupabaseDB.sendDownloads({ data: objDownload });
  }, []);

  const getDownloadsCount = async () => {
    const [download] = await Promise.all([SupabaseDB.getDownloads()]);
    setDownloads({
      data: {
        download_count: download?.download_count,
        city: download?.city,
        ip: download?.ip,
        so: download?.so,
      },
    });
  };

  const createLink = async () => {
    setDownloadComplete(false);
    const link = document.createElement("a");
    link.href =
      "https://github.com/solidsnk86/neo-wifi/releases/download/v1.1.3/Neo-Wifi.Setup.1.1.3.rar";
    link.download = "Neo-Wifi Setup 1.1.3.rar";
    await sendDataToSupabase().catch((err) =>
      console.error("Error al enviar datos:", err)
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDownloadComplete(true);
    }, 3000);
  };

  useEffect(() => {
    getDownloadsCount();
  }, []);

  if (downloadComplete) {
    window.scrollTo({
      top: 0,
    });
    return (
      <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
        <MouseTrail />
        <Navbar />
        <section className="py-24">
          <HomeBlockTitle>Gracias por descargar Neo WiFi App 😃</HomeBlockTitle>
          <div className="flex xl:max-w-md max-w-[364px] p-6 border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary my-12 mx-auto backdrop-blur-xl z-50">
            <article className="flex flex-col gap-3 justify-center mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-blue-500 mx-auto" />
              <h1 className="text-2xl font-bold">¡Tu descarga ha comenzado!</h1>
              <p className="text-center">
                La descarga de <strong>Neo-WiFi</strong> está en proceso y
                finalizará pronto.
              </p>
              <Link
                href="/"
                className={`text-white py-2 px-4 mx-auto bg-blue-500 w-fit mt-4 rounded-lg transition-transform duration-300 hover:shadow-lg hover:scale-105 ${styles.button}`}
              >
                Volver al inicio
              </Link>
            </article>
          </div>
          <p className="my-4 text-center text-pretty px-3 z-50">
            Recuerda que puedes leer la documentación
            <Link
              href="/start/introduction"
              className="mx-1 text-blue-500 relative hover:underline"
            >
              aquí.
              <CurveArrowIcon className="absolute top-6 left-[-8px]" />
            </Link>
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <MouseTrail />
      <Navbar />
      <section className="py-16">
        <HomeBlock className="flex-col justify-center text-center">
          <HomeBlockTitle>Introducción</HomeBlockTitle>
          <YouTubeLiteVideo
            videoId="7ZqQ-NsTzYA"
            width={360}
            height={300}
            className="rounded-xl flex justify-center mx-auto my-12 z-50 relative"
            border={0}
          />
          <p className="my-4 text-pretty px-3 z-50">
            Antes de comenzar con la descarga te recomiendo que veas el video, o
            leas la documentación
            <Link
              href="/start/introduction"
              className="mx-1 text-yellow-400 relative hover:underline"
            >
              aquí.
              <CurveArrowIcon className="absolute top-6 left-[-8px]" />
            </Link>
          </p>
        </HomeBlock>
        <HomeBlockTitle className="md:text-[2.5rem] text-3xl font-semibold flex justify-center mx-auto relative z-50">
          Descarga
        </HomeBlockTitle>
        <article className="flex flex-col xl:max-w-md max-w-[364px] border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary my-12 mx-auto backdrop-blur-xl z-50">
          <h3 className="font-semibold font-['bogue-black'] text-xl my-2 border-zinc-200/70 dark:border-zinc-800 border-b py-2 px-3">
            Información del archivo
          </h3>
          <div className="flex flex-col p-2 gap-2">
            <p className="flex items-center text-sm">
              <FileText className="mx-2 w-6 h-6" /> Neo-Wifi Setup 1.1.3
            </p>
            <p className="flex items-center text-sm">
              <FileArchive className="mx-2 w-6 h-6" /> Tamaño del fichero:
              80.82Mb.
            </p>
            <p className="flex items-center text-sm">
              <FileBox className="mx-2 w-6 h-6" /> Extensión: (.exe)
            </p>
            <time className="flex items-center text-sm">
              <FilePenIcon className="mx-2 w-6 h-6" /> Creación: 04/03/2025,
              12:38:29p.m.
            </time>
            <time className="flex items-center text-sm">
              <Activity className="mx-2 w-6 h-6" /> Última actualización:
              24/03/2025, 17:18:33p.m.
            </time>
            <p className="flex items-center text-sm">
              <FileDown className="mx-2 w-6 h-6" /> Total de descargas:{" "}
              {downloads?.data.download_count || 0}
            </p>
            <p className="flex items-center text-sm">
              <WindowsLogo width={24} height={24} className="mx-2" /> Compatible
              para SO Windows x64/x86
            </p>
          </div>
          <aside className="flex justify-end p-4">
            <button
              title="Descargar Neo-Wifi Setup 1.1.3"
              className="py-2 px-4 bg-green-500 w-fit mt-4 rounded-xl hover:scale-[1.03] transition-transform duration-300 hover:shadow-lg"
              onClick={createLink}
            >
              <span className={`text-white ${styles.button}`}>
                Descargar (81.77MB)
              </span>
            </button>
          </aside>
        </article>
        <div>
          <h2 className="text-center">
            Haz click
            <span
              className="mx-[3px] text-blue-500 dark:text-yellow-400 hover:underline cursor-pointer"
              onClick={createLink}
            >
              aquí
            </span>
            si la descarga aún no ha comenzado..
          </h2>
        </div>
      </section>
      <Footer />
    </main>
  );
}

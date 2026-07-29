"use client";

import { SupabaseDB } from "@/services/Supabase";
import { useCallback, useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useLocation } from "../contexts/use-location";
import styles from "./styles/button.module.css";
import {
  Activity,
  CheckCircle,
  FileArchive,
  FileBox,
  FileDown,
  FilePenIcon,
  FileText,
  Loader,
} from "lucide-react";
import { HomeBlock, HomeBlockTitle } from "../components/BlockComp";
import Link from "next/link";
import { CurveArrowIcon } from "./Icons/ArrowIcon";
import { YouTubeLiteVideo } from "../components/YoutubeVideo";
import { WindowsLogo } from "../components/DownloadButton/Icon/WindowsLogo";
import { formatDate } from "@/utils/format-date";
import MarkdownRenderer from "../components/MarkDownRender";

interface ReleaseAPI {
  release: {
    htmlURL: string;
    appName: string;
    appVersion: string;
    fileName: string;
    fileSize: string;
    createdAt: string;
    updatedAt: string;
    downloadURL: string;
    downloadCount: number;
    appInfo: string;
  };
}

export default function Page() {
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [appData, setAppData] = useState<ReleaseAPI>();
  const [isLoading, setIsLoading] = useState(true);
  const { ipInfo } = useLocation();

  const sendDataToSupabase = useCallback(async () => {
    if (!ipInfo) return;
    const objDownload = {
      ip: ipInfo.ip,
      city: ipInfo.cityName,
      so: ipInfo.sysInfo.system,
      browser: ipInfo.sysInfo.webBrowser.browser,
      app_version: appData?.release.appVersion,
    };
    await SupabaseDB.sendDownloads({ data: objDownload });
  }, [appData?.release.appVersion, ipInfo]);

  const getAppData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/releases");
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      setAppData(data);
      setIsLoading(false);
    } catch (error) {
      console.log("Cannot get data:", (error as TypeError).message);
      setIsLoading(false);
    }
  };

  const createLink = async () => {
    setDownloadComplete(false);
    const link = document.createElement("a");
    link.href =
      appData?.release.downloadURL ||
      "https://github.com/solidsnk86/neo-wifi/releases/download/1.2.5/Neo-Wifi.Setup.1.2.5.rar";
    link.download = appData?.release.fileName || "Neo-Wifi.Setup.1.2.5.rar";
    await sendDataToSupabase().catch((err) =>
      console.error("Error al enviar datos:", err),
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setDownloadComplete(true);
    }, 3000);
  };

  useEffect(() => {
    getAppData();
  }, []);

  if (downloadComplete) {
    window.scrollTo({
      top: 0,
    });

    return (
      <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
        <Navbar />
        <section className="py-24">
          <HomeBlockTitle>Gracias por descargar Neo WiFi App 😃</HomeBlockTitle>
          <div className="flex xl:max-w-md max-w-91 p-6 border bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary my-12 mx-auto backdrop-blur-xl z-50">
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
              <CurveArrowIcon className="absolute top-6 -left-2" />
            </Link>
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <Navbar />
      <section className="py-16">
        <HomeBlock className="flex-col justify-center text-center">
          <HomeBlockTitle>Información</HomeBlockTitle>

          {isLoading ? (
            <article className="h-230.5 p-4 mt-12 text-left border bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 rounded-2xl z-50 relative backdrop-blur-xl">
              <div className="flex mt-20 gap-2 mx-auto items-center justify-center align-middle font-semibold">
                <Loader className="animate-spin text-zinc-800 dark:text-zinc-200" />
                Cargando...
              </div>
            </article>
          ) : (
            <article className="h-[100%] p-4 mx-3 mt-12 text-left border bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 rounded-2xl z-50 relative backdrop-blur-xl">
              <MarkdownRenderer content={appData?.release?.appInfo || ""} />
            </article>
          )}

          <YouTubeLiteVideo
            videoId="9t6QI3QCFUw"
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
              className="mx-1 text-blue-500 relative hover:underline"
            >
              aquí.
              <CurveArrowIcon className="absolute top-6 -left-2" />
            </Link>
          </p>
        </HomeBlock>
        <HomeBlockTitle className="md:text-[2.5rem] text-3xl font-semibold flex justify-center mx-auto relative z-50">
          Descarga
        </HomeBlockTitle>
        <article className="flex flex-col xl:max-w-md max-w-91 border bg-[#FFFFFF] dark:bg-zinc-800/40 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary my-12 mx-auto backdrop-blur-xl z-50">
          <h3 className="font-semibold font-bogue-black text-xl my-2 border-zinc-200/70 dark:border-zinc-800 border-b py-2 px-3">
            Información del archivo
          </h3>
          <div className="flex flex-col p-2 gap-2">
            <div className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <FileText className="text-zinc-500" size={20} />
              </div>{" "}
              Neo-Wifi Setup {appData?.release?.appVersion || "v1.2.4"}
            </div>
            <div className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <FileArchive className="text-zinc-500" size={20} />
              </div>{" "}
              Tamaño del fichero: {appData?.release?.fileSize}
            </div>
            <div className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <FileBox className="text-zinc-500" size={20} />
              </div>{" "}
              Archivo: {appData?.release?.fileName || ""}
            </div>
            <time className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <FilePenIcon className="text-zinc-500" size={20} />
              </div>{" "}
              Creación: {formatDate(appData?.release?.createdAt || "")}
            </time>
            <time className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <Activity className="text-zinc-500" size={20} />
              </div>{" "}
              Última actualización:{" "}
              {formatDate(appData?.release?.updatedAt || "")}
            </time>
            <div className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <FileDown className="text-zinc-500" size={20} />
              </div>{" "}
              Total de descargas: {appData?.release?.downloadCount || 0}
            </div>
            <p className="flex gap-2 items-center text-sm">
              <div className="p-1 rounded-md outline outline-offset-1 outline-zinc-200 dark:outline-zinc-800 border border-zinc-200 dark:border-zinc-800">
                <WindowsLogo width={20} height={20} className="text-zinc-500" />
              </div>
              Compatible para SO Windows x64/x86
            </p>
          </div>
          <aside className="flex justify-end p-4">
            <button
              title={`Descargar ${appData?.release?.appName}`}
              className="py-2 px-4 bg-green-500 w-fit mt-4 rounded-xl hover:scale-[1.03] transition-transform duration-300 hover:shadow-lg"
              onClick={createLink}
            >
              <span className={`text-white ${styles.button}`}>
                Descargar ({appData?.release?.fileSize})
              </span>
            </button>
          </aside>
        </article>
        <div className="relative z-40">
          <h2 className="text-center">
            Haz click
            <span
              className="mx-0.75 text-blue-500 hover:underline cursor-pointer"
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

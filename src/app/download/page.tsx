"use client";

import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import { useCallback, useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import styles from "./styles/button.module.css";
import {
  Activity,
  FileArchive,
  FileBox,
  FileDown,
  FilePenIcon,
  FileText,
} from "lucide-react";
import { DownloadsProps } from "@/types/definitions";

export default function DownloadPage() {
  const [downloads, setDownloads] = useState<DownloadsProps>();

  const sendDataToSupabase = useCallback(async () => {
    const { ip, sysInfo, cityName } = await getIP();
    const objDownload = {
      ip: ip,
      city: cityName,
      so: sysInfo.system,
    };
    await SupabaseDB.sendDownloads({ data: objDownload });
  }, []);

  const getDownloadsCount = async () => {
    const download = await SupabaseDB.getDownloads();
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
    const link = document.createElement("a");
    link.href = "/Neo-Wifi Setup 1.0.1.exe";
    link.download = "Neo-Wifi Setup 1.0.1.exe";
    await sendDataToSupabase().catch((err) =>
      console.error("Error al enviar datos:", err)
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    getDownloadsCount();
  }, []);

  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <Navbar />
      <section className="pb-10">
        <h1 className="flex justify-center mx-auto text-4xl font-bold pt-24">
          Descarga
        </h1>
        <article className="flex flex-col xl:max-w-md max-w-[364px] border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 rounded-2xl relative text-text-primary my-12 mx-auto">
          <h3 className="font-semibold text-xl my-2 border-zinc-200/70 dark:border-zinc-800 border-b py-2 px-3">
            Información del archivo
          </h3>
          <div className="flex flex-col p-2 gap-2">
            <p className="flex items-center text-sm">
              <FileText className="mx-2 w-6 h-6" /> Neo-Wifi Setup 1.0.1
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
              04/03/2025, 14:58:29p.m.
            </time>
            <p className="flex items-center text-sm">
              <FileDown className="mx-2 w-6 h-6" /> Total de descargas:{" "}
              {downloads?.data.download_count || 0}
            </p>
          </div>
          <aside className="flex justify-end p-4">
            <button
              title="Neo-Wifi Setup 1.0.1"
              className="py-2 px-4 bg-green-500 w-fit mt-4 rounded-xl hover:scale-[1.03] transition-transform duration-300 hover:shadow-lg"
              onClick={createLink}
            >
              <span className={`text-white ${styles.button}`}>
                Descargar (80.82MB)
              </span>
            </button>
          </aside>
        </article>
      </section>
      <Footer />
    </main>
  );
}

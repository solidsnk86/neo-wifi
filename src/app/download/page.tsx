"use client";

import { SupabaseDB } from "@/services/Supabase";
import { getIP } from "@/utils/get-ip";
import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components";
import styles from "./styles/button.module.css";
import {
  Activity,
  FileArchive,
  FileBox,
  FileDown,
  FilePenIcon,
  FileText,
} from "lucide-react";
import { formatDate } from "@/utils/format-date";
import { DownloadsProps } from "@/types/definitions";

interface FileInfoProps {
  file: string;
  size: number;
  creation: string;
  mod: string;
  extension: string;
}

export default function DownloadPage() {
  const [fileInfo, setFileInfo] = useState<FileInfoProps>();
  const [downloads, setDownloads] = useState<DownloadsProps>();

  const getFileInfo = async () => {
    const res = await fetch("/api/file-info");
    const data: FileInfoProps = await res.json();
    setFileInfo({
      file: data.file,
      size: data.size,
      creation: data.creation,
      mod: data.mod,
      extension: data.extension,
    });
  };

  useEffect(() => {
    getFileInfo();
  }, []);

  const sendDataToSupabase = useCallback(async () => {
    const { ip, sysInfo, cityName } = await getIP();
    await SupabaseDB.sendDownloads({
      data: { ip, so: sysInfo, city: cityName },
    });
  }, []);

  const getDownloadsCount = async () => {
    const data = await SupabaseDB.getDownloads();
    const { download_count, ip, city, so } = data;
    setDownloads({ data: { download_count, ip, city, so } });
  };

  const createLink = async () => {
    const link = document.createElement("a");
    link.href = "/Neo-Wifi Setup 1.0.1.exe";
    link.download = "Neo-Wifi Setup 1.0.1.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    await sendDataToSupabase();
  };

  useEffect(() => {
    getDownloadsCount();
  }, []);

  return (
    <main className="bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200 h-[100dvh]">
      <Navbar />
      <section style={{ padding: "2rem" }} className="">
        <h1 className="flex justify-center mx-auto text-4xl font-bold pt-16">
          Descarga
        </h1>
        <div className="flex flex-col space-y-2 border bg-[#FFFFFF] dark:bg-zinc-800/50 border-zinc-200/70 dark:border-zinc-800 p-4 rounded-2xl relative text-text-primary my-12 w-fit mx-auto">
          <h3 className="font-semibold text-xl my-2">
            Información del archivo
          </h3>
          <p className="flex items-center">
            <FileText className="mx-2 w-6 h-6" />{" "}
            {fileInfo?.file || "Actualizando..."}
          </p>
          <p className="flex items-center">
            <FileArchive className="mx-2 w-6 h-6" /> Tamaño del fichero:{" "}
            {fileInfo?.size || 0}Mb.
          </p>
          <p className="flex items-center">
            <FileBox className="mx-2 w-6 h-6" /> Extensión:{" "}
            {fileInfo?.extension || "Actualizando..."}
          </p>
          <p className="flex items-center">
            <FilePenIcon className="mx-2 w-6 h-6" /> Creación:{" "}
            {formatDate(fileInfo?.creation || "") || "Actualizando..."}
          </p>
          <p className="flex items-center">
            <Activity className="mx-2 w-6 h-6" /> Última actualización:{" "}
            {formatDate(fileInfo?.mod || "") || "Actualizando..."}
          </p>
          <p className="flex items-center">
            <FileDown className="mx-2 w-6 h-6" /> Total de descargas:{" "}
            {downloads?.data.download_count || 0}
          </p>
          <aside className="flex justify-end">
            <button
              title={`Descargar ${fileInfo?.file}`}
              className="py-2 px-4 bg-green-500 w-fit mt-4 rounded-xl hover:scale-105 transition-transform duration-300"
              onClick={createLink}
            >
              <span className={`text-white ${styles.button}`}>
                Descargar ({fileInfo?.size}MB)
              </span>
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}

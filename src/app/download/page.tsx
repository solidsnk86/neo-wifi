"use client";

import { SupabaseDB } from "@/services/Supabase";
import { DownloadsProps } from "@/types/definitions";
import { getIP } from "@/utils/get-ip";
import { useCallback, useEffect, useState } from "react";

export default function DownloadPage() {
  const [downloads, setDownloads] = useState<DownloadsProps>();

  const sendDataToSupabase = useCallback(async () => {
    const { ip, sysInfo, cityName } = await getIP();
    await SupabaseDB.sendDownloads({
      data: { ip, so: sysInfo, city: cityName },
    });
  }, []);

  const getDownloadsCount = async () => {
    const { download_count, ip, city, so } = await SupabaseDB.getDownloads();
    setDownloads({ data: { download_count, ip, city, so } });
  };

  useEffect(() => {
    sendDataToSupabase();
    const link = document.createElement("a");
    link.href = "/Neo-Wifi Setup 1.0.1.exe";
    link.download = "Neo-Wifi Setup 1.0.1.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [sendDataToSupabase]);

  useEffect(() => {
    getDownloadsCount();
  }, []);

  return (
    <div className="bg-[#f5f5f5] dark:bg-[#111]">
      <h2>Descargas de la app: {downloads?.data.download_count || 0}</h2>
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function DownloadPage() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/Neo-Wifi Setup 1.0.1.exe";
    link.download = "Neo-Wifi Setup 1.0.1.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);
  return <div className="bg-[#f5f5f5] dark:bg-[#111]"></div>;
}

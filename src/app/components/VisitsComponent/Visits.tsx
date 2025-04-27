/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SupabaseDB } from "@/services/Supabase";
import { useEffect, useState, cloneElement, Children, ReactNode } from "react";
import styles from "./styles/visits.module.css";
import { PartialOptionsProps } from "@/types/definitions";

const Marquee = ({ data }: Pick<PartialOptionsProps, "data">) => {
  return (
    <small className={styles.visits}>
      Última visita desde {data?.city || "No disponible"},{" "}
      {data?.state || "No disponible"} - {data?.country || "No disponible"}{" "}
      {data?.emoji_flag || "No disponible"} el día{" "}
      {new Date(data?.created_at as string).toLocaleDateString("es-AR", {
        year: "numeric",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}{" "}
      • Total de visitas: {data?.id || 0} • Dispositivo:{" "}
      {data?.so || "No disponible"} {data?.so === "Windows" ? "💻" : "📲"}
    </small>
  );
};

const CloneVisits = ({ children }: { children: ReactNode }) => {
  return (
    <article className="flex w-[500%] xl:w-[200%] border-t border-b border-zinc-200/70 bg-[#FFFFFF] dark:bg-zinc-800/50 dark:border-zinc-800 p-3 overflow-hidden z-50 backdrop-blur-lg relative shadow-lg">
      {Children.map(children, (child) => cloneElement(child as any))}
      {Children.map(children, (child) => cloneElement(child as any))}
    </article>
  );
};

export const VisitsComponent = () => {
  const [visitData, setVisitData] = useState();

  useEffect(() => {
    const getData = async () => {
      await SupabaseDB.getOptionalData({
        from: "neo_wifi_visitors",
        select: "id,city,state,country,emoji_flag,so,created_at",
        limit: 1,
        order: "created_at",
      })
        .then((data) => {
          setVisitData(data);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);
  return (
    <CloneVisits>
      <Marquee data={visitData} />
    </CloneVisits>
  );
};

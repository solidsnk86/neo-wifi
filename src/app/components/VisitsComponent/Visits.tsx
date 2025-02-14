"use client";

import { SupabaseDB } from "@/services/ModelSB";
import { useEffect, useState } from "react";
import styles from "./styles/visits.module.css";

export const VisitsComponent = () => {
  const [visitData, setVisitData] = useState({
    id: 0,
    city: "",
    state: "",
    country: "",
    emoji_flag: "",
    created_at: "",
  });

  useEffect(() => {
    const getData = async () => {
      await SupabaseDB.getOptionalData({
        from: "neo_wifi_visitors",
        select: "id,city,state,country,emoji_flag,created_at",
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
    <article className="w-full border border-slate-800 bg-gradient-to-b from-blue-400/10 to-slate-500/10 p-3">
      <small className={styles.visits}>
        Última visita desde {visitData?.city || "No disponible"},{" "}
        {visitData?.state || "No disponible"}{" "}
        {visitData?.country || "No disponible"}{" "}
        {visitData?.emoji_flag || "No disponible"} el día{" "}
        {new Date(visitData?.created_at).toLocaleDateString("es-AR", {
          year: "numeric",
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}{" "}
        Total de visitas: {visitData?.id || 0}
      </small>
    </article>
  );
};

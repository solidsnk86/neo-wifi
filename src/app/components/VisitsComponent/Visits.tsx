"use client";

import { SupabaseDB } from "@/services/ModelSB";
import { useEffect, useState } from "react";
import styles from "./styles/visits.module.css";

export const VisitsComponent = () => {
  const [visitData, setVisitData] = useState({
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
    <small className={styles.visits}>
      Última visita desde {visitData?.city || "No disponible"},{" "}
      {visitData?.state || "No disponible"}{" "}
      {visitData?.country || "No disponible"} el día{" "}
      {new Date(visitData?.created_at).toLocaleDateString("es-AR", {
        year: "numeric",
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </small>
  );
};

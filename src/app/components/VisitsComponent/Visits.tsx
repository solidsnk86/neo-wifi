"use client";

import { SupabaseDB } from "@/services/ModelSB";
import { useEffect, useState } from "react";
import styles from "./styles/visits.module.css";

export const VisitsComponent = () => {
  const [visitData, setVisitData] = useState({
    city: "",
    state: "",
    emoji_flag: "",
    created_at: "",
  });

  useEffect(() => {
    const getData = async () => {
      await SupabaseDB.getOptionalData({
        from: "neo_wifi_visitors",
        select: "id,city,state,emoji_flag,created_at",
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
      {visitData?.emoji_flag || "No disponible"}el día{" "}
      {new Date(visitData?.created_at).toLocaleDateString()}
    </small>
  );
};

"Use client";

import { useEffect, useState } from "react";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import styles from "./styles/card.module.css";

export const DownloadCard = () => {
  const [appVersion, setAppVersion] = useState({
    version: "",
  });
  useEffect(() => {
    const getVersionApp = async () => {
      await fetch("/api/cpe-info")
        .then((res) => res.json())
        .then((data) => setAppVersion(data))
        .catch((err) => console.error(err));
    };
    getVersionApp();
  }, []);

  return (
    <article
      className={`${styles.article} border border-zinc-200/70 dark:border-zinc-700/80 z-50`}
    >
      <div className={styles.text_container}>
        <h2>
          Neo-WiFi App <small>{appVersion.version || "v1.2.4"}</small>
        </h2>
        <p>
          Esta aplicación es una herramienta diseñada para automatizar y
          optimizar la configuración de tu red WiFi de manera rápida y sencilla.
          Puedes instalarla en tu PC y gestionar tu red de forma eficiente y
          automática, sin complicaciones.
        </p>

        <DownloadButton className={styles.btn} />
      </div>
      <div className={styles.img_container}>
        <div className={styles.bg_left}></div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src="/assets/rocket.png"
          alt="rocket image"
          className={styles.img}
        />
      </div>
    </article>
  );
};

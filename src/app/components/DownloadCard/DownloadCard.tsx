// import { DownloadButton } from "../DownloadButton/DownloadButton";
import styles from "./styles/card.module.css";

export const DownloadCard = () => {
  return (
    <article
      className={`${styles.article} border border-zinc-200/70 dark:border-zinc-700/80`}
    >
      <div className={styles.text_container}>
        <h2>
          Neo-WiFi App <small>v1.0.1(beta)</small>
        </h2>
        <p>
          Esta aplicación es una herramienta diseñada para automatizar la
          configuración de tu red WiFi de forma rápida y sencilla.
        </p>
        <p>
          Actualmente, se encuentra en desarrollo, pero muy pronto estará
          disponible para instalar en tu PC, permitiéndote gestionar y optimizar
          la configuración de tu red de manera eficiente y automática.
        </p>
        {/* <DownloadButton className={styles.btn} /> */}
      </div>
      <div className={styles.img_container}>
        <div className={styles.bg_left}></div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src="/rocket.png" alt="rocket image" className={styles.img} />
      </div>
    </article>
  );
};

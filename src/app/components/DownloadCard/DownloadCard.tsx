import { DownloadButton } from "../DownloadButton/DownloadButton";
import styles from "./styles/card.module.css";

export const DownloadCard = () => {
  return (
    <article className={styles.article}>
      <div className={styles.text_container}>
        <h2>
          Neo-WiFi App <small>v1.0.1</small>
        </h2>
        <p>
          Esta applicación incluye una herramienta que automatiza la
          configuración de tu red WiFi. Solo necesitas descargarla, instalarla y
          seguir las instrucciones.
        </p>
        <DownloadButton className={styles.btn} />
      </div>
      <div className={styles.img_container}>
        <div className={styles.bg_left}></div>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src="/rocket.png" alt="rocket image" className={styles.img} />
      </div>
    </article>
  );
};

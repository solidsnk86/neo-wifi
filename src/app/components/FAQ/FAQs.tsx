import styles from "./styles/marquee.module.css";

export const Faqs = () => {
  return (
    <>
      <section className={`${styles.marquee} w-[600%] my-24`}>
        <p className={styles.p}>
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
        </p>
        <div className={styles.reverse}>
          <h3 className={styles.h3}>
            NEO-WIFI 2025 ▪ NEO-WIFI 2025 ▪ NEO-WIFI 2025 ▪ NEO-WIFI 2025 ▪ NEO-
            WIFI 2025 ▪
          </h3>
        </div>
        <p className={styles.p}>
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
        </p>
      </section>
    </>
  );
};

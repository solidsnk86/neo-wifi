import styles from "./styles/marquee.module.css";

export const Faqs = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <section className={`${styles.marquee} w-[600%] my-24 z-50 relative`}>
        <p className={styles.p}>
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
          PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES · PREGUNTAS FRECUENTES ·
        </p>
        <div className={styles.reverse}>
          <h3 className={styles.h3}>
            NEO-WIFI {currentYear} ▪ NEO-WIFI {currentYear} ▪ NEO-WIFI{" "}
            {currentYear} ▪ NEO-WIFI {currentYear} ▪ NEO- WIFI {currentYear} ▪
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

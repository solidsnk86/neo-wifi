import Link from "next/link";
import styles from "./styles/span-style.module.css";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <section className="max-w-3xl flex justify-center mx-auto p-4">
      <Link href="/" className="fixed top-4 left-4 flex gap-2 items-center">
        <ArrowLeft /> Volver
      </Link>
      <article className="my-10">
        <h2 className="text-3xl font-bold">Política de Uso y Privacidad</h2>
        <h6 className="font-semibold my-10">
          Última actualización: <time>28 de enero de 2025</time>
        </h6>
        <p className={styles.p}>
          Gracias por utilizar <span>Neo-Wifi</span> y sus aplicaciones
          respectivas. Esta política de uso y privacidad describe cómo
          recopilamos, utilizamos y protegemos la información que nos
          proporcionas o que obtenemos a través de tu uso del Sitio. Al acceder
          y utilizar el Sitio, aceptas los términos descritos en esta política.
        </p>
        <h2 className={styles.h2}>1. Información que recopilamos</h2>
        <p>
          El Sitio utiliza geolocalización para proporcionarte información sobre
          antenas gubernamentales cercanas, incluyendo su ubicación, distancia,
          SSID (identificador de red), dirección MAC y otros datos técnicos.
          Para ello, recopilamos y procesamos los siguientes tipos de
          información:
        </p>
        <ul className={styles.ul}>
          <li>
            <b>Datos de geolocalización:</b> Utilizamos tu ubicación en tiempo
            real para calcular la distancia y mostrarte las antenas más
            cercanas.
          </li>
          <li>
            <b>Datos técnicos de las antenas:</b> He recopilado información
            pública proporcionada por entidades gubernamentales sobre las
            antenas, como su ubicación, SSID, dirección MAC y otros detalles
            técnicos en el sitio oficial
            <a
              className="underline text-blue-400 mx-1"
              href="https://wifi.sanluis.gov.ar/#"
            >
              https://wifi.sanluis.gov.ar/#
            </a>
            en el cual he creado mi propio mapa de datos en formato JSON para
            poder calcular la distancia.
          </li>
          <li>
            <b>Datos de uso:</b> Recopilamos información sobre cómo interactúas
            con el Sitio, como las páginas visitadas, el tiempo de permanencia y
            las acciones realizadas.
          </li>
        </ul>
        <h2 className={styles.h2}>2. Uso de la Información</h2>
        <p>La información recopilada se utiliza para los siguientes fines:</p>
        <ul className={styles.ul}>
          <li>
            Proporcionarte información precisa y personalizada sobre las antenas
            gubernamentales cercanas.
          </li>
          <li>
            Mejorar la funcionalidad y la experiencia del usuario en el Sitio.
          </li>
          <li>Realizar análisis estadísticos y mejorar nuestros servicios.</li>
          <li>Cumplir con obligaciones legales y regulatorias.</li>
        </ul>
        <h2 className={styles.h2}>3. Uso de Cookies (Información personal)</h2>
        <p>
          No compartimos tu inforamción personal con terceros excepto en los
          siguientes casos:
        </p>
        <ul className={styles.ul}>
          <li>
            <b>Con tu consentimiento:</b> Si nos autorizas a compartir tu
            información con terceros.
          </li>
          <li>
            <b>Por obligación legal:</b> Si estamos obligados a divulgar
            información en cumplimiento de leyes, regulaciones o procesos
            judiciales.
          </li>
          <li>
            <b>Con proveedores de servicios</b>: Podemos compartir información
            con proveedores de servicios que nos ayudan a operar el Sitio (por
            ejemplo, hosting, análisis de datos), siempre que estos terceros
            cumplan con nuestras políticas de privacidad.
          </li>
        </ul>
        <h2 className={styles.h2}>4. Seguridad de la Información</h2>
        <p>
          Implementamos medidas técnicas y organizativas para proteger la
          información que recopilamos. Sin embargo, ten en cuenta que ninguna
          transmisión de datos por Internet o método de almacenamiento es 100%
          seguro. No podemos garantizar la seguridad absoluta de la información.
        </p>
        <h2 className={styles.h2}>5. Tus Derechos</h2>
        <p>
          Dependiendo de tu jurisdicción, puedes tener los siguientes derechos
          sobre tus datos personales:
        </p>
        <ul className={styles.ul}>
          <li>
            <b>Acceso:</b> Solicitar una copia de la información que tenemos
            sobre ti.
          </li>
          <li>
            <b>Rectificación:</b> Solicitar la correción de información inexacta
            o incompleta.
          </li>
          <li>
            <b>Eliminación:</b> Solicitar la eliminacipón de tus datos
            personales.
          </li>
          <li>
            <b>Limitación del Procesamiento:</b> Solicitar que limitemos el uso
            de tus datos
          </li>
          <li>
            <b>Portabilidad: </b> Solicitar que te proporcionemos tus datos en
            formato estructurado y de uso común.
          </li>
          <li>
            <b>Oposición:</b> Oponerte al procesamiento de tus datos en ciertas
            circunstancias.
          </li>
        </ul>
        <p>
          Para ejecrcer estos derechos contáctate a este correo:{" "}
          <a
            className="underline text-blue-400"
            href="mailto:tutosneotecs@gmail.com"
          >
            tutosneotecs@gmail.com
          </a>
        </p>
        <h2 className={styles.h2}>6. Uso de Cookies y Tecnologías Similares</h2>
        <p>
          El Sitio puede utilizar cookies y tecnologías similares para mejorar
          la experiencia del usuario y analizar el tráfico. Puedes gestionar o
          desactivar las cookies a través de la configuración de tu navegador.
        </p>

        <h2 className={styles.h2}>7. Cambios en esta Política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política en cualquier
          momento. Te notificaremos de cambios significativos a través del Sitio
          o por otros medios. Te recomendamos revisar esta política
          periódicamente.
        </p>
        <h2 className={styles.h2}>8. Contacto</h2>
        <p>
          Si tienes preguntas o inquietudes sobre esta política de uso y
          privacidad, contáctanos en:
        </p>

        <div className="text-xs my-6 border-l-4 border-button-variant pl-3">
          <p>Neo-Wifi</p>
          <p>Dirección: Avenida Fuerza Aérea 551</p>
          <p>Concarán, San Luis, 5770</p>
          <a
            className="underline text-blue-400"
            href="mailto:tutosneotecs@gmail.com"
          >
            tutosneotecs@gmail.com
          </a>
        </div>
      </article>
    </section>
  );
}

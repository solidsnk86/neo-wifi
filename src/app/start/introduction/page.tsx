"use client";

import { Footer, Navbar } from "@/app/components";
import { HomeBlock, HomeBlockTitle } from "@/app/components/BlockComp";
import { Donation } from "@/app/components/DonationCard/Donation";
import { GeoPosition } from "@/app/components/GeoInfo/components/GeoPosition";
import MouseTrail from "@/app/components/MouseTrail";
import { YouTubeLiteVideo } from "@/app/components/YoutubeVideo";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const dataLocation = {
    city: "Merlo",
    state: "San Luis",
    departament: "Junín",
    country: "Argentina",
  };
  const coords = {
    latitude: "-32.3426293326",
    longitude: "-65.013554958",
  };

  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <MouseTrail />
      <Navbar />
      <section style={{ padding: "2rem" }}>
        <HomeBlockTitle className="pt-24 z-50">Introducción</HomeBlockTitle>
        <HomeBlock className="flex-col text-pretty space-y-3 text-center z-50">
          <p>
            Bienvenido a esta aplicación de configuración automatizada para
            dispositivos TP-Link.
          </p>
          <p>
            Esta herramienta de escritorio ha sido diseñada para simplificar y
            agilizar la configuración de CPE inalámbricos y routers de la marca
            TP-Link, permitiendo a los usuarios optimizar sus dispositivos de
            red con solo unos clics.
          </p>
          <p>
            Con una interfaz intuitiva y funcionalidades avanzadas, la
            aplicación elimina la necesidad de configuraciones manuales
            complejas, reduciendo errores y mejorando la eficiencia en la
            instalación. Ya sea para despliegues individuales o configuraciones
            masivas, esta solución ofrece una manera rápida, segura y eficaz de
            ajustar los parámetros esenciales de los dispositivos, garantizando
            una conectividad estable y optimizada. Cabe destacar que la posición
            de la antena (CPE) debe ser ajustada por el mismo usuario.
          </p>
        </HomeBlock>
        <HomeBlockTitle>Primeros Pasos</HomeBlockTitle>
        <HomeBlock className="flex-col">
          <p>
            Para utilizar esta aplicación, es necesario restablecer la antena,
            ya que desconocemos las credenciales de acceso, como el nombre de
            usuario y la contraseña, que el técnico pudo haber configurado en el
            sistema de la CPE de TP-Link. Para hacerlo, debemos resetear la
            antena a través del adaptador PoE, el cual se conecta a la
            corriente. Este adaptador cuenta con dos puertos: PoE, que
            suministra energía y transmite datos, y WAN, que envía los datos al
            router.
          </p>
          <Image
            src="/assets/tp-link-Outdoor-CPE-Passive-PoE-Adapter-300x218-removebg.png"
            width={300}
            height={300}
            alt="Imagen del adaptador POE de TP-LINK"
            className="flex justify-center mx-auto my-10"
          />
          <p>
            En uno de los laterales del dispositivo hay un pequeño orificio. Si
            introduces un clip o un objeto punzante con suavidad, sin aplicar
            demasiada presión, notarás un botón interno. Manteniéndolo
            presionado durante aproximadamente 20 segundos, la antena se
            reseteará a los valores de fábrica. El principal indicador de este
            proceso es el router: en el panel frontal, el LED de conexión WAN 🌐
            se tornará de color 🟠 (naranja) o permanecerá apagado.
          </p>
          <Image
            src="/assets/product_overview.png"
            width={400}
            height={400}
            alt="Imagen router TP-LINK modelo TL-WR841N"
            className="flex justify-center mx-auto my-10"
          />
          <p>
            Una vez reseteada la antena (CPE) de TP-LINK, procederemos a
            descargar la aplicación
            <Link href="/download" className="mx-1 underline text-sky-500">
              Neo-WiFi App.
            </Link>
          </p>
          <p>
            Si ya hemos completado la desacarga se procecede con la instalación
            de la misma.
          </p>
          <Image
            src="/assets/0qrxocgUxk.png"
            width={400}
            height={400}
            alt="Imagen del instalador aplicación Neo-WiFi"
            className="flex justify-center mx-auto my-10"
          />
          <p>
            Le damos a siguiente, y luego instalar. Una vez que finaliza la
            instalación podemos ejecutarla y veremos la pantalla principal de la
            aplicación:
          </p>
          <Image
            src="/assets/Neo-Wifi_wJQ5REdFJa.png"
            width={800}
            height={400}
            alt="Imagen de pantalla principal Neo-WiFi App"
            className="flex justify-center mx-auto my-10"
          />
        </HomeBlock>

        <HomeBlockTitle>Coordenadas</HomeBlockTitle>

        <HomeBlock className="flex-col">
          <p>
            En esta misma web en la sección principal se proveen las coordenadas
            de latitud y longitud para ser empleada en la app. Para ello debemos
            aceptar y/o permitir la ubicación del dispositivo apenas carga la
            web.
          </p>
          <Image
            src="/assets/DL317doHxn.png"
            width={400}
            height={400}
            alt="Imagen permitir ubicación en el navegador"
            className="flex justify-center mx-auto my-10"
          />
          <p>
            Una vez que hemos podido permitir a la aplicación web obtener tu
            ubicación podemos emplear las coordenadas obtenidas de tu posición
            geográfica como se muestra a continuación en el siguiente ejemplo.
            (Posición a modo de ejemplo, no es real.)
          </p>
          <div className="my-10">
            <GeoPosition
              loading={false}
              location={dataLocation}
              coords={coords}
            />
          </div>
          <p>
            Colocamos las cordenadas de latitud y de longitud entonces la
            aplicación ya podrá saber donde te encuentras y cual es tu antena
            más cercana, y que distancia te encuentras del nodo WiFi más
            cercano.
          </p>
          <Image
            src="/assets/Neo-Wifi_g91otTkNqQ.png"
            width={800}
            height={400}
            alt="Imagen aplicación con ingreso de coordenadas"
            className="flex justify-center mx-auto my-10"
          />
        </HomeBlock>
        <HomeBlockTitle>Configuración Router</HomeBlockTitle>
        <HomeBlock className="flex-col">
          <p>
            El siguiente paso es hacer clic en
            <span className="border border-zinc-300/70 dark:border-zinc-800 px-2 ml-1 rounded-md font-mono text-sm">
              Configurar Router
            </span>
            . Una vez completada la configuración de los puertos a estáticos, lo
            cual toma menos de 5 segundos, debemos seleccionar la frecuencia de
            nuestra antena. Si el modelo es:
            <span className="border border-zinc-300/70 dark:border-zinc-800 px-2 mx-1 rounded-md font-mono text-sm">
              CPE710, CPE610, CPE510
            </span>
            significa que opera en 5 GHz. Si el modelo es:
            <span className="border border-zinc-300/70 dark:border-zinc-800 px-2 mx-1 rounded-md font-mono text-sm">
              CPE220, CPE210, CPE205
            </span>
            entonces funciona en 2.4 GHz.
          </p>
          <p>
            Dependiendo del modelo, seleccionamos la frecuencia correspondiente
            y hacemos clic en
            <span className="border border-zinc-300/70 dark:border-zinc-800 px-2 ml-[2px] rounded-md font-mono text-sm">
              Configurar
            </span>
            . A partir de aquí, la aplicación se encargará de configurar
            automáticamente la antena CPE. Durante el proceso, se abrirá una
            ventana en el navegador donde la aplicación realizará su trabajo.
          </p>
          <p>
            Para más detalles, pueden ver el video introductorio sobre la
            aplicación y su correcto funcionamiento.
          </p>
        </HomeBlock>
      </section>
      <HomeBlockTitle>Video</HomeBlockTitle>
      <YouTubeLiteVideo
        videoId="7ZqQ-NsTzYA"
        width={400}
        height={300}
        className="rounded-xl flex justify-center mx-auto my-12"
        border={0}
      />
      <Donation />
      <Footer />
    </main>
  );
}

import { Footer, Navbar } from "@/app/components";
import { HomeBlock, HomeBlockTitle } from "@/app/components/BlockComp";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)] bg-[#f5f5f5] dark:bg-[#111] text-zinc-900 dark:text-zinc-200">
      <Navbar />
      <section style={{ padding: "2rem" }}>
        <HomeBlockTitle className="pt-24">Introducción</HomeBlockTitle>
        <HomeBlock className="flex-col text-pretty space-y-3 text-center">
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
            una conectividad estable y optimizada.
          </p>
        </HomeBlock>
        <HomeBlockTitle>Primeros Pasos</HomeBlockTitle>
        <HomeBlock className="flex-col">
          <p>
            Para poder usar ésta aplicación debemos tener reseteada la antena,
            debido a que no sabemos las credenciales de usuario
            correspondientes, como el nombre de usaurio y contraseña que el
            técnico puede haber fijado en el sistema de configuración de la CPE
            de TP-LINK en este caso. Para ello hay que resetear la antena
            mediante el adaptador POE que va enchufado a la corriente y éste
            tiene dos puertos, WAN y POE, uno lleva energía y transmisión de
            datos (POE), el otro lleva los datos al router (WAN):
          </p>
          <Image
            src="/assets/tp-link-Outdoor-CPE-Passive-PoE-Adapter-300x218-removebg.png"
            width={300}
            height={300}
            alt="Imagen del adaptador POE de TP-LINK"
            className="flex justify-center mx-auto my-10"
          />
          <p>
            En uno de los laterales se puede observar un orificio el cual
            introduciendo un clip o un objeto punzante sin necesidad de
            presionar o atravesarlo con demasiada fuerza se puede sentir un
            botón, que si lo mantienes durante unos 20 segundos aproximadamete
            se va a resetear la antena a valores de fábrica. El indicador más
            visible que tenemos para darnos cuenta de que ésto sucede es el
            router, normalmente en el led de conexión WAN en el panel frontal el
            led 🌐 estará de color 🟠 (naranja) o apagado:
          </p>
          <Image
            src="/assets/product_overview.png"
            width={400}
            height={400}
            alt="Imagen del adaptador POE de TP-LINK"
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
            alt="Imagen del adaptador POE de TP-LINK"
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
            alt="Imagen del adaptador POE de TP-LINK"
            className="flex justify-center mx-auto my-10"
          />
        </HomeBlock>
        <HomeBlockTitle>Obtención de Coordenadas</HomeBlockTitle>
        <HomeBlock className="flex-col">
          <p>
            En esta misma web en la sección principal se proveen las coordenadas
            de latitud y longitud para ser empleada en la app. Para ello debemos
            aceptar y/o permitir la ubicación del dispositivo apenas carga la
            web.
          </p>
          <Image
            src="/assets/DL317doHxn.png"
            width={800}
            height={400}
            alt="Imagen del adaptador POE de TP-LINK"
            className="flex justify-center mx-auto my-10"
          />
        </HomeBlock>
      </section>
      <Footer />
    </main>
  );
}

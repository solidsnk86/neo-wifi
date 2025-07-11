import { GeoPosition } from "@/app/components/GeoInfo/components/GeoPosition";
import Link from "next/link";

export const dataLocation = {
  city: "Merlo",
  state: "San Luis",
  departament: "Junín",
  country: "Argentina",
};

export const coords = {
  latitude: "-32.3426293326",
  longitude: "-65.013554958",
};

export const stepsMap = [
  {
    id: 1,
    paragraph: (
      <p>
        Para utilizar esta aplicación, es necesario restablecer la antena, ya
        que desconocemos las credenciales de acceso, como el nombre de usuario y
        la contraseña, que el técnico pudo haber configurado en el sistema de la
        CPE de TP-Link. Para hacerlo, debemos resetear la antena a través del
        adaptador PoE, el cual se conecta a la corriente. Este adaptador cuenta
        con dos puertos: PoE, que suministra energía y transmite datos, y WAN,
        que envía los datos al router.
      </p>
    ),
    info: "Adaptador POE de TP-LINK, con indicaciones del botón reset.",
    url: "/assets/tp-link-Outdoor-CPE-Passive-PoE-Adapter-300x218-removebg.png",
  },
  {
    id: 2,
    paragraph: (
      <p>
        En uno de los laterales del dispositivo hay un pequeño orificio. Si
        introduces un clip o un objeto punzante con suavidad, sin aplicar
        demasiada presión, notarás un botón interno. Manteniéndolo presionado
        durante aproximadamente 20 segundos, la antena se reseteará a los
        valores de fábrica. El principal indicador de este proceso es el router:
        en el panel frontal, el LED de conexión WAN 🌐 se tornará de color 🟠
        (naranja) o permanecerá apagado.
      </p>
    ),
    info: "Imagen router TP-LINK modelo TL-WR841N y su panel frontal con leds indicadores",
    url: "/assets/product_overview.png",
  },
  {
    id: 3,
    paragraph: (
      <>
        <p>
          Una vez reseteada la antena (CPE) de TP-LINK, procederemos a descargar
          la aplicación
          <Link href="/download" className="mx-1 underline text-sky-500">
            Neo-WiFi App.
          </Link>
        </p>
        <p>
          Si ya hemos completado la descarga se procede con la instalación de la
          misma. Le damos a siguiente, y luego instalar.
        </p>
      </>
    ),
    info: "Imagen del instalador de la aplicación Neo-WiFi PC",
    url: "/assets/0qrxocgUxk.png",
  },
  {
    id: 4,
    paragraph: (
      <p>
        Una vez que finaliza la instalación podemos ejecutarla y veremos la
        pantalla principal de la aplicación, la misma ya detecta automáticamente
        los dispositivos
        <strong className="mx-1">CPE de TP-LINK</strong>, solamente los modelos
        mencionados:
        <code className="text-sm mx-1 bg-zinc-800 px-2 py-1 rounded text-[--green]">
          CPE210 - CPE220 - CPE510 - CPE610 - CPE710
        </code>
      </p>
    ),
    info: "Pantalla principal de la aplicación",
    url: "/assets/neo.wifi-app-v1-2-4.png",
  },
  {
    id: 5,
    paragraph: (
      <p>
        En esta misma web en la sección principal se proveen las coordenadas de
        latitud y longitud para ser empleadas en la app. Para ello debemos
        aceptar y/o permitir la ubicación del dispositivo apenas carga la web.
      </p>
    ),
    info: "Ventana emergente para activación de la ubicación",
    url: "/assets/neo-wifi-coordenadas.png",
  },
  {
    id: 6,
    paragraph: (
      <>
        <p>
          Una vez que hemos permitido a la aplicación web obtener tu ubicación
          podemos emplear las coordenadas obtenidas de tu posición geográfica
          como se muestra a continuación en el siguiente ejemplo, ahora puedes
          copiar el valor para <strong className="mx-1">latitud</strong> y para{" "}
          <strong className="mx-1">longitud</strong>. (Posición a modo de
          ejemplo, no es real.)
        </p>
        <div className="my-10">
          <GeoPosition
            loading={false}
            location={dataLocation}
            coords={coords}
          />
        </div>
      </>
    ),
    info: "Ventana emergente para activación de la ubicación",
    url: "/assets/DL317doHxn.png",
  },
  {
    id: 7,
    paragraph: (
      <p>
        Colocamos las coordenadas de latitud y de longitud, entonces la
        aplicación ya podrá saber dónde te encuentras y cuál es tu antena más
        cercana, y a qué distancia te encuentras del nodo WiFi más cercano.
        Dicho esto, hay que posicionar la antena a dicho{" "}
        <strong>Nodo del Gobierno</strong>. Tratar de evitar obstáculos. Si todo
        va bien, entonces elegimos el método de configuración
      </p>
    ),
    info: "Imagen aplicación con ingreso de coordenadas",
    url: "/assets/Neo-Wifi_g91otTkNqQ.png",
  },
];

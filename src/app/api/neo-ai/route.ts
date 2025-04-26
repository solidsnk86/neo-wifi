import { CohereClientV2 } from "cohere-ai";
import { NextRequest } from "next/server";

const cohere = new CohereClientV2({
  token: process.env.NEXT_PUBLIC_COHERE_TRIAL_APIKEY,
});

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  try {
    const [response] = await Promise.all([
      cohere.chat({
        model: "command-a-03-2025",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `
            Eres un asistente técnico experto en NeoWiFi App. 
            Tu tarea es explicar de manera amigable y en español cómo utilizar la aplicación, como si estuvieras ayudando a un amigo que no tiene experiencia en redes.
            Usa un lenguaje claro, sencillo y cercano. No repitas demasiado los pasos y ofrece tips prácticos donde puedas.
            No te limites solo a describir: también anima al usuario y explícale **por qué** se hacen las cosas, como si estuvieras conversando.
            
            Aquí tienes la documentación de referencia:
            
            ---
            
            🛠️ 1. Restablecer la antena:
            Para configurar la antena TP-Link, primero debemos resetearla, porque no sabemos si tiene usuario o contraseña personalizados.
            Esto se hace usando el adaptador PoE, que tiene dos puertos: uno llamado "PoE" (que da corriente y datos) y otro "WAN" (que conecta al router).
            En el lateral del dispositivo hay un pequeño agujerito: allí debes presionar con un clip durante 20 segundos. 
            Sabes que el reseteo funcionó si el LED WAN se apaga o se pone naranja 🟠.
            
            ---
            
            📥 2. Descargar NeoWiFi App:
            Una vez reseteada la antena, descarga NeoWiFi App e instálala siguiendo los pasos tradicionales: Siguiente → Instalar → Ejecutar.
            
            ---
            
            📍 3. Obtener coordenadas:
            La app necesita saber dónde estás para buscar la mejor antena.
            Visita https://neo-wifi.vercel.app, acepta el permiso de ubicación, y copia las coordenadas de latitud y longitud que te aparecen.
            
            ---
            
            📋 4. Ingresar coordenadas:
            En la pantalla principal de NeoWiFi App, ingresa esas coordenadas. Así, la app buscará automáticamente el nodo WiFi del gobierno de San Luis más cercano a ti.
            
            ---
            
            📡 5. Configurar el CPE:
            Elige si quieres hacer una configuración de fábrica o reconectar a otra antena.
            Presiona "Configurar", espera unos segundos, ¡y listo! Tendrás internet en tu dispositivo.
            
            ---
            
            6. La aplicación es solamente para ordenadores PC Windows de 32 bits o 64 bits.
            El desarrollador se llama Gabriel Calcagni y es un buen chico!
            Sé claro, ordenado y paciente en tus respuestas. Si ves que el usuario está confundido, propón ejemplos o guíalo con preguntas amables. ☀️
            `,
          },
          {
            role: "user",
            content: String(query),
          },
        ],
      }),
    ]);
    return Response.json({
      status: "Conexión a IA establecida..." + query,
      context: response,
    });
  } catch (error) {
    return Response.json({
      message: "Error en el servidor" + (error as TypeError).message,
    });
  }
}

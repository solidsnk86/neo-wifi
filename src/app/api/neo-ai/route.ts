import { CohereClientV2 } from "cohere-ai";
import { NextResponse } from "next/server";
import { SYSTEM_NEOWIFI_CONTENT } from "./constants";

const cohere = new CohereClientV2({
  token: process.env.NEXT_PUBLIC_COHERE_TRIAL_APIKEY,
});

export async function POST(request: Request) {
  const { query, city, country, temp, lang } = await request.json();

  const generate = async () => {
    return await cohere.chat({
      model: "command-a-03-2025",
      temperature: parseFloat(temp),
      messages: [
        {
          role: "system",
          content: SYSTEM_NEOWIFI_CONTENT(lang),
        },
        {
          role: "user",
          content:
            query +
            " " +
            `Datos extras, ubicación del usuario: ${city}, ${country}`,
        },
      ],
    });
  };
  try {
    const [response] = await Promise.all([generate()]);

    return NextResponse.json({
      status: "Conexión a IA establecida...",
      context: response,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error en el servidor" + (error as TypeError).message,
    });
  }
}

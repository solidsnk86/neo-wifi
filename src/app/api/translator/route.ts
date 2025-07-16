import { CohereClientV2 } from "cohere-ai";
import { NextResponse } from "next/server";
import { TRANSLATE_NEO_SYSTEM } from "./constants";

const cohere = new CohereClientV2({
  token: process.env.COHERE_TRIAL_APIKEY,
});

export async function POST(request: Request) {
  const { text, language } = await request.json();

  if (!text && !language) return NextResponse.json({ message: "Se necesita pasar el JSON en el cuerpo del POST" })

  const generate = async () => {
    return await cohere.chat({
      model: "command-a-03-2025",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: TRANSLATE_NEO_SYSTEM(language),
        },
        {
          role: "user",
          content: text,
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

import OpenAI from "openai";
import { NextResponse } from "next/server";
import { TRANSLATE_NEO_SYSTEM } from "./constants";

const client = new OpenAI({
  apiKey: process.env.NEOTECS_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  const { text, language } = await request.json();

  if (!text && !language) return NextResponse.json({ message: "Se necesita pasar el JSON en el cuerpo del POST" })

  const generate = async () => {
    return await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
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

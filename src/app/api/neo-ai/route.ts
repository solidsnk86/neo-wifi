import { NextResponse } from "next/server";
import { SYSTEM_NEOWIFI_CONTENT } from "./constants";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.NEOTECS_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  const { query, city, country, temp, lang } = await request.json();

  const generate = async () => {
    return await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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
      context: response.choices[0].message?.content,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error en el servidor" + (error as TypeError).message,
    });
  }
}

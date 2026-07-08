import { CohereClientV2 } from "cohere-ai";
import { NextResponse } from "next/server";
import { SYSTEM_NEOWIFI_CONTENT } from "./constants";
import OpenAI from "openai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_TRIAL_APIKEY,
});
const client = new OpenAI({
  apiKey: process.env.NEOTECS_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  const { query, city, country, temp, lang } = await request.json();

  const generate = async () => {
    return await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
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

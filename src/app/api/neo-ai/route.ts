import { NextResponse } from "next/server";
import { SYSTEM_NEOWIFI_CONTENT } from "./constants";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const client = new OpenAI({
  apiKey: process.env.NEOTECS_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(request: Request) {
  const { query, city, country, temp, lang, history } = await request.json();

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: SYSTEM_NEOWIFI_CONTENT(lang, city, country),
    },
    {
      role: "user",
      content: query
    },
    ...(Array.isArray(history) ? history : [])
  ];

  const generate = async () => {
    return await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: parseFloat(temp),
      messages
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

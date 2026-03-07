import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const runtime = 'edge';

export async function GET(req: Request) {
    const params = new URL(req.url)
    const message = params.searchParams.get("message")

    try {
        const result = streamText({
        model: google('gemini-3-flash-preview'),
        
        messages: [{ role: "user", content: JSON.stringify(message) }]
    });

    return result.toTextStreamResponse();
    } catch (error) {
        return Response.json({ message: "Algo pasó: " + error })
    }
}
import { supabase } from "@/supabase/utils/connection"

export async function POST(req: Request) {
    const { ip, city, country, so, browser } = await req.json();
    const data = { ip, city, country, so, browser };
    if (!ip || !city || !country || !so || !browser) {
        return Response.json({ message: "Faltan datos" })
    }
    try {
        const { error } = await supabase.from("apk_downloads").insert([data]);
        if (error) throw new Error(error.message);
        return Response.json({ message: "" })
    } catch (error) {
        return Response.json({ message: "Error al enviar datos: " + error })
    }
}
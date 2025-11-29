import { supabase } from "@/supabase/utils/connection";

export async function POST(req: Request) {
  try {
    const { ip, city, country, latitude, longitude, so, browser, version, emoji_flag } = await req.json();   
    const payload = { ip, city, country, latitude, longitude, so, browser, version, emoji_flag }
    const { error } = await supabase
      .from("neo-wifi_visitors")
      .insert([
        { ip, city, country, latitude, longitude, so, browser, version, emoji_flag },
      ]);

    if (error) return Response.json({ message: "Error to send data: " + error.message, payload }, { status: 400 });

    return Response.json({ message: "Data registered OK" });
  } catch (error) {
    return Response.json({
      message: "Server error: " + (error as TypeError).message,
    });
  }
}

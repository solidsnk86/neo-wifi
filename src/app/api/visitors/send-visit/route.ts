import { supabase } from "@/supabase/utils/connection";

export async function POST(req: Request) {
  try {
    const { ip, city, country, state, latitude, longitude, so, browser, emoji_flag } =
      await req.json();

    const { data, error } = await supabase
      .from("neo-wifi_visitors")
      .insert([
        { ip, city, country, state, latitude, longitude, so, browser, emoji_flag },
      ]);

    if (error) return Response.json({ message: "Error to send data: " + error.message });

    return Response.json({ message: "Data registered OK", data });
  } catch (error) {
    return Response.json({
      message: "Server error: " + (error as TypeError).message,
    });
  }
}

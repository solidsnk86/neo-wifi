import { supabase } from "@/supabase/utils/connection";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("neo_wifi_visitors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    if (error)
      return Response.json({
        message: "Error al obtener datos de Supabase: " + error.message,
      });
    return Response.json(data);
  } catch (error) {
    return Response.json({
      message: "Server error: " + (error as TypeError).message,
    });
  }
}

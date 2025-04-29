import { supabase } from "@/supabase/utils/connection";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const { error } = await supabase.from("neowifi_prompts").insert([data]);
    if (error) throw new Error(error.message);
    return Response.json({ message: "Prompt enviado correctamente", data });
  } catch (err) {
    return Response.json({
      message: "Server error: " + (err as TypeError).message,
    });
  }
}

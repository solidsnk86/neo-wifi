import { supabase } from "@/supabase/utils/connection";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data) return Response.json({ message: "Without data", payload: data }, { status: 400 });

  try {
    const { error } = await supabase.from("apk_downloads").insert([data]);
    if (error) return Response.json({ message: error.message });
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error", error: (error as TypeError).message },
      { status: 500 },
    );
  }
}

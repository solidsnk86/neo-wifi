import { createClient } from "@supabase/supabase-js";

const SUPABASE = {
  URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  API_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const supabase = createClient(SUPABASE.URL!, SUPABASE.API_KEY!);

export { supabase };

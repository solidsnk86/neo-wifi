import { supabase } from "@/supabase/utils/connection";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const user = searchParams.get("user");
  const badge_gradient_1 = searchParams.get("badge_gradient_1");
  const badge_gradient_2 = searchParams.get("badge_gradient_2");
  const counter_color = searchParams.get("counter_color");

  const username = user ? String(user).toLowerCase() : "";

  const formatThousand = (value: number): string => {
    return value >= 1000 ? "168" : "164";
  };

  const formatValue = (value: number): string | number => {
    let formattedValue: number | string = 0;
    if (value >= 1000) {
      formattedValue = (value / 1000).toFixed(1);
    } else if (value >= 10000) {
      formattedValue = (value / 10000).toFixed(1);
    }
    return formattedValue === 0 ? value : formattedValue;
  };

  try {
    const { data: lastCount, error } = await supabase
      .from("badge_counter")
      .select("visit_count, gh_profile")
      .eq("gh_profile", username)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    let newCount: number;
    if (lastCount && lastCount.length > 0) {
      newCount = (lastCount[0].visit_count || 0) + 1;
    } else {
      newCount = 1;
    }

    const { error: insertError } = await supabase
      .from("badge_counter")
      .insert([{ visit_count: newCount, gh_profile: username }]);

    if (insertError) {
      throw new Error("Cannot send data to DB: " + insertError.message);
    }

    const adjustCounter = (counter: number): string => {
      if (counter >= 10000) return "136";
      if (counter >= 100) return "134";
      if (counter >= 10) return "137";
      if (String(counter).includes("1.0K")) return "112";
      return "140";
    };

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${formatThousand(
        newCount
      )} 26" width="${formatThousand(newCount)}" height="26">
        <style>
            #badge-main {
                filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
                transition: all 0.3s ease;
            }
            #main-text {
                text-shadow: 0 1px 1px rgba(0,0,0,0.2);
            }
            #eyes {animation: blink 4s infinite;}
            @keyframes blink {
                0%,100% {opacity: 1;}
                95% {opacity: 1;}
                96% {opacity: 0.1;}
                98% {opacity: 0.1;}
                99% {opacity: 1;}
            }
        </style>
        
        <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color: #${
                  badge_gradient_1 || "282534"
                }"/>
                <stop offset="100%" style="stop-color: #${
                  badge_gradient_2 || "4868A9"
                }"/>
            </linearGradient>
            
            <linearGradient id="count-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color: #${
                  counter_color || "FF832A"
                }"/>
                <stop offset="100%" style="stop-color: #${
                  counter_color || "E56D1A"
                }"/>
            </linearGradient>
        </defs>
        
        <rect width="163" height="26" ry="2.8" fill="#3D444D"/>
        <rect x="1" y="1" id="badge-main" ry="2.5" width="161" height="24" fill="url(#bg-gradient)"/>
        
        <rect x="1" y="1" id="badge-main" ry="2.5" width="161" height="24" fill="url(#bg-gradient)"/>
        
        <rect x="128" y="1" width="2" height="24" fill="url(#count-gradient)" class="counter-box"/>
        <rect x="128" y="1" width="34" rx="2.5" height="24" fill="url(#count-gradient)" class="counter-box"/>
        
        <text id="eyes" y="18" x="4" font-size="15" text-rendering="geometricPrecision">👀</text>
        <text id="main-text" x="29" y="18" fill="#fff" font-family="Arial, sans-serif" font-size="14" text-rendering="geometricPrecision" font-weight="500">Visitas al perfil</text>
        <text id="text-counter" x="${adjustCounter(
          newCount
        )}" y="18" fill="#fff" font-family="Arial, sans-serif" font-size="${
      newCount >= 1000 ? "11" : "13"
    }" text-align="center" font-weight="500">${formatValue(newCount)}</text>
      </svg>
    `;

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Server error: " + (err as Error).message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

import { DownloadsProps, OptionalProps } from "@/types/definitions";

export class SupabaseDB {
  public static async getAllData() {
    try {
      const response = await fetch(
        `https://supabase-rest-api.vercel.app/supabase/?from=neo_wifi_visitors&select=*`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }

  public static async getOptionalData({
    from,
    select,
    limit,
    order,
  }: Omit<OptionalProps, "data">) {
    try {
      const response = await fetch(
        `https://supabase-rest-api.vercel.app/supabase/optional?from=${from}&select=${select}&limit=${limit}&order=${order}`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }

  public static async sendVisits({ data }: OptionalProps) {
    try {
      await fetch(
        `/api/send-visit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      
    } catch (error) {
      console.error(error);
    }
  }

  public static async getLastIP() {
    try {
      const response = await fetch("/api/visitors");
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      const lastIP  = data[0]?.ip
      return { lastIP };
    } catch (error) {
      console.error(error);
    }
  }

  public static async getVisitsCount() {
    try {
      const response = await fetch(
        "https://supabase-rest-api.vercel.app/supabase/optional?from=neo_wifi_visitors&select=id&limit=1&order=created_at"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }

  public static async sendDownloads({ data }: DownloadsProps) {
    try {
      const response = await fetch(
        "https://supabase-rest-api.vercel.app/supabase/?from=downloads",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error(response.statusText);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getDownloads() {
    try {
      const response = await fetch(
        "https://supabase-rest-api.vercel.app/supabase/optional?from=downloads&select=download_count&limit=1&order=created_at",
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }
}

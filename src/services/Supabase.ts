import { OptionalProps } from "@/types/definitions";

export class SupabaseDB {
  public static async getAllData() {
    try {
      const response = await fetch(
        `http://localhost:3639/supabase/?from=neo_wifi_visitors&select=*`,
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
        `http://localhost:3639/supabase/optional?from=${from}&select=${select}&limit=${limit}&order=${order}`,
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
      const response = await fetch(
        `http://localhost:3639/supabase/?from=neo_wifi_visitors`,
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

  public static async getLastIP() {
    try {
      const response = await fetch(
        "http://localhost:3639/supabase/optional?from=neo_wifi_visitors&select=ip&limit=1&order=created_at"
      );
      if (!response.ok)
        throw new Error("Cannot get ip: " + response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }

  public static async getVisitsCount() {
    try {
      const response = await fetch(
        "http://localhost:3639/supabase/optional?from=neo_wifi_visitors&select=id&limit=1&order=created_at"
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }
}

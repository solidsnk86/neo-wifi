interface OptionalProps {
  from: string;
  select: string;
  limit: number;
  order: string;
  data: {
    city: string;
    state: string;
    departament: string;
    country: string;
    longitude: number;
    latitude: number;
    nearest_wifi: string;
    distance: number;
    ip: string;
    so: string;
    emoji_flag: string;
  };
}

export type { OptionalProps };

interface OptionalProps {
  from: string;
  select: string;
  limit: number;
  order: string;
  data: {
    id: number;
    ip: string;
    city: string;
    state: string;
    departament: string;
    country: string;
    emoji_flag: string;
    so: string;
    created_at: string;
    longitude: number;
    latitude: number;
    nearest_wifi: string;
    distance: number;
  };
}

export type { OptionalProps };
export type PartialOptionsProps = Partial<OptionalProps>;

interface OptionalProps {
  from: string;
  select: string;
  limit: number;
  order: string;
  data: {
    id: number;
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
    created_at: Date | string | number;
  };
}

export type { OptionalProps };
export type PartialOptionsProps = Partial<OptionalProps>;

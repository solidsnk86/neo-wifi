type ClassValue = string | number | boolean | null | undefined | ClassValue[] | { [key: string]: boolean | null | undefined };

function toClassName(value: ClassValue): string {
  if (!value) {
    return "";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toClassName).filter(Boolean).join(" ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, enabled]) => Boolean(enabled))
      .map(([key]) => key)
      .join(" ");
  }

  return "";
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.map(toClassName).filter(Boolean).join(" ");
}

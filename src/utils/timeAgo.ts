const rtf = new Intl.RelativeTimeFormat();

export const timeAgo = (date: Date) => {
  const diff = date.getTime() - Date.now();
  const abs = Math.abs(diff);

  if (isNaN(abs)) {
    return;
  }

  const units = [
    { unit: "years", ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: "months", ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: "days", ms: 1000 * 60 * 60 * 24 },
    { unit: "hours", ms: 1000 * 60 * 60 },
    { unit: "minutes", ms: 1000 * 60 },
    { unit: "seconds", ms: 1000 },
  ];

  for (const { unit, ms } of units) {
    if (abs >= ms || unit === "seconds") {
      const value = Math.round(diff / ms);
      return rtf.format(value, unit as Intl.RelativeTimeFormatUnit);
    }
  }
};

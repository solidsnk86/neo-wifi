export const checkLanguage = (lang: string) => {
  if (lang.includes("es-")) {
    return `Español (${lang})`;
  } else if (lang.includes("en-")) {
    return `English (${lang})`;
  } else if (lang.includes("fr-")) {
    return `Francés (${lang})`;
  } else if (lang.includes("it-")) {
    return `Italiano (${lang})`;
  } else if (lang.includes("ru-")) {
    return `Ruso (${lang})`;
  } else if (lang.includes("ja-")) {
    return `Japonés (${lang})`;
  } else if (lang.includes("pt-")) {
    return `Portugués (${lang})`;
  } else if (lang.includes("hi-")) {
    return `Indi (${lang})`;
  } else if (lang.includes("nl-")) {
    return `Holandés (${lang})`;
  } else if (lang.includes("pl-")) {
    return `Polaco (${lang})`;
  } else if (lang.includes("de-")) {
    return `Alemán (${lang})`;
  } else if (lang.includes("ko-")) {
    return `Croata (${lang})`;
  } else if (lang.includes("zh-")) {
    return `Chino (${lang})`;
  } else if (lang.includes("id-")) {
    return `Indonesio (${lang})`;
  }
  return lang;
};

export {};;

declare global {
  interface TranslatorInstance {
    translate(text: string): Promise<string>;
  }

  interface Translator {
    create(options: {
      sourceLanguage: "es" | "en";
      targetLanguage: "es" | "en";
    }): Promise<TranslatorInstance>;
  }

  const Translator: Translator;
}

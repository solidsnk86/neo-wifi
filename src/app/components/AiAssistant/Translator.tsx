"use client";

import { Languages, Mic, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Lexend, Share_Tech_Mono } from "next/font/google";

import { default as languageCodesData } from "./languages-codes.json";
import { default as countryCodesData } from "./country-codes.json";

const languageCodes: Record<string, string> = languageCodesData;
const countryCodes: Record<string, string> = countryCodesData;

const lexend = Lexend({
  weight: ["400"],
  subsets: ["latin"],
});
const techMono = Share_Tech_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

interface ContextAIProps {
  context: {
    id: string;
    message: {
      role: string;
      content: [{ type: string; text: string }];
    };
    finishReason: string;
  };
}

export const Translator = () => {
  const [text, setText] = useState<string>("");
  const [translate, setTranslate] = useState<string>("");
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>();
  const [language, setLanguage] = useState<string>("en-EN");
  const [isActived, setIsActived] = useState(false);
  const recognitionRef = useRef<SpeechRecognition>(null);

  const avlailableLanguages = Array.from(
    new Set(voices?.map(({ lang }) => lang))
  )
    .map((lang) => {
      const split = lang.split("-");
      const languageCode: string = split[0];
      const countryCode: string = split[1];
      return {
        lang,
        label: languageCodes[languageCode] || lang,
        dialect: countryCodes[countryCode],
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();

    if (Array.isArray(voices) && voices.length > 0) {
      setVoices(voices);
      return;
    }

    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
      };
    }
  }, []);

  const handleOnRecord = () => {
    if (isActived) {
      recognitionRef.current?.stop();
      setIsActived(false);
      return;
    }

    speak(" ");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.onstart = () => {
      setIsActived(true);
    };

    recognitionRef.current.onend = () => {
      setIsActived(false);
    };

    recognitionRef.current.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);

      const response: ContextAIProps = await fetch("/api/translator", {
        method: "POST",
        body: JSON.stringify({
          text: transcript,
          language,
        }),
      }).then((res) => res.json());
      const translatedText = response.context.message.content[0].text;
      setTranslate(translatedText);

      speak(translatedText);
    };

    recognitionRef?.current.start();
  };

  const avalaibleVoices = voices?.filter(({ lang }) => lang === language);
  const activeVoice =
    avalaibleVoices?.find(({ name }) => name.includes("Google")) ||
    avalaibleVoices?.find(({ name }) => name.includes("Microsoft"));

  const speak = (text: string) => {
    if (!activeVoice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.voice = activeVoice;
    window.speechSynthesis.speak(utterance);
  };
  console.log(activeVoice)

  return (
    <section className="flex flex-col md:max-w-4xl space-y-3 justify-center mx-auto p-4 border bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 rounded-xl z-50 relative">
      <header className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <h1
          className={`text-xl sm:text-2xl md:text-3xl font-bold flex items-center p-4 mx-auto ${lexend.className} text-zinc-800 dark:text-zinc-100`}
        >
          <Languages className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 mr-2" />
          Traductor de Idiomas
        </h1>
      </header>

      <aside className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center p-4 bg-green-700/50 dark:bg-green-950/20 rounded-xl border border-green-400/20 backdrop-blur-xl">
        <label
          htmlFor="language"
          className="flex gap-2 items-center uppercase text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Idioma
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-md p-2 outline-blue-500 border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
          >
            {avlailableLanguages.map(({ lang, label }) => (
              <option key={lang} value={lang}>
                {label} ({lang})
              </option>
            ))}
          </select>
        </label>

        <div
          className={`flex items-center gap-2 justify-center ${techMono.className}`}
        >
          <span
            className={`w-4 h-4 rounded-full ${
              !isActived ? "bg-red-950" : "bg-red-500"
            }`}
          />
          <span className="w-24 text-center">
            {isActived ? (
              <div className="loader-container animate-pulse">
                Grabando<span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            ) : (
              "Detenido"
            )}
          </span>
        </div>

        <button
          onClick={handleOnRecord}
          type="button"
          className={`px-3 py-2 rounded-full transition-all duration-150 border border-zinc-300 dark:border-zinc-600 ${
            isActived
              ? "bg-gradient-to-b from-red-500 to-red-700"
              : "bg-gradient-to-b from-blue-500 to-blue-700"
          } hover:ring-2 hover:ring-offset-2 ring-blue-500`}
        >
          <Mic className="text-white w-5 h-5" />
        </button>
      </aside>

      <footer
        className={`w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 ${lexend.className}`}
      >
        <div className="text-sm text-zinc-800 p-3 dark:text-zinc-100 flex gap-2 flex-wrap relative items-center mb-2">
          <strong>Texto hablado:</strong> {text}
          <span
            onClick={() => speak(text)}
            className="dark:hover:bg-zinc-800 hover:bg-zinc-200/70 ml-auto p-1 rounded-full"
          >
            <Volume2 />
          </span>
        </div>
        <div className="text-sm text-zinc-800 p-3 dark:text-zinc-100 flex gap-2 flex-wrap relative items-center">
          <strong>Texto traducido:</strong> {translate}
          <span
            onClick={() => speak(translate)}
            className="dark:hover:bg-zinc-800 hover:bg-zinc-200/70 ml-auto p-1 rounded-full"
          >
            <Volume2 />
          </span>
        </div>
      </footer>
    </section>
  );
};

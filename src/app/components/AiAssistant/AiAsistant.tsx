import { FormEvent, useEffect, useRef, useState } from "react";
import MarkdownRenderer from "../MarkDownRender";
import { ArrowUp, Mic, RefreshCw, X } from "lucide-react";
import styles from "./styles/assistant.module.css";
import Image from "next/image";
import { navLanguages, shareTechMono } from "./constants";

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

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AiAssistant = ({
  history,
  closeAssistant,
}: {
  history?: Message[];
  closeAssistant: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([...(history ?? [])]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const thinkRef = useRef<HTMLDivElement>(null);
  const [textVoice, setTextVoice] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognition>(null);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [tempValue, setTempValue] = useState(0.3);
  const [language, setLanguage] = useState<string>("es-AR");

  const sendQuery = async ({
    text,
    city,
    country,
    temp,
    lang,
  }: {
    text: string;
    city: string;
    country: string;
    temp: string | number;
    lang: string;
  }) => {
    try {
      setIsLoading(true);
      const res: ContextAIProps = await fetch(`/api/neo-ai/`, {
        method: "POST",
        body: JSON.stringify({ query: text, city, country, temp, lang }),
      }).then((res) => res.json());

      const assistantMessage: Message = {
        role: "assistant",
        content: res.context.message.content[0].text,
      };
      const userMessage: Message = {
        role: "user",
        content: query,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      localStorage.setItem(
        "neo-wifi-chat",
        JSON.stringify([userMessage, assistantMessage])
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    setTextVoice(newValue);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;

    const userMessage: Message = { role: "user", content: query.trim() };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    const [clientData] = await Promise.all([
      (await fetch("https://solid-geolocation.vercel.app/location")).json(),
    ]);

    await sendQuery({
      text: query,
      city: clientData.city.name,
      country: clientData.country.name,
      temp: tempValue,
      lang: language,
    });

    const objectData = {
      prompt: userMessage.content,
      ip: clientData.ip,
      city: clientData.city.name,
      country: clientData.country.name,
    };

    await fetch("/api/datasend", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objectData),
    }).catch((err) => console.error(err));

    thinkRef.current?.scrollIntoView({ behavior: "auto" });
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const newChat = () => {
    const storageName = "neo-wifi-chat";
    setMessages([]);
    setQuery("");
    localStorage.removeItem(storageName);
  };

  const handleInput = () => {
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.style.height = "auto";
      refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`;
    }
  }, [query]);

  const handleOnRecord = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.onstart = function () {
      setIsMicActive(true);
    };
    recognitionRef.current.onend = function () {
      setIsMicActive(false);
    };

    recognitionRef.current.lang = language;

    recognitionRef.current.onresult = async (event) => {
      const trasncript = event.results[0][0].transcript;
      setTextVoice(trasncript);
      setQuery(trasncript);
    };

    recognitionRef.current.start();
  };

  useEffect(() => {
    if (textVoice.trim()) {
      setQuery(textVoice);
    }
  }, [textVoice]);

  return (
    <section
      className="w-full mx-auto h-[100dvh] flex-col gap-2 border-x-2 border-t-2 border-zinc-200/70 dark:border-zinc-800 md:rounded-t-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl overflow-hidden chat"
      id="chat"
    >
      <div className="flex flex-col justify-between items-center p-4 border-b border-zinc-200/70 dark:border-zinc-800">
        <span
          className="group absolute right-2 top-2"
          title="Cerrar asistente"
          onClick={closeAssistant}
        >
          <X
            size={24}
            className="group-hover:text-red-400 group-hover:dark:bg-zinc-700/50 group-hover:bg-zinc-300/70 rounded-md text-black dark:text-white"
          />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white text-center font-['bogue-black']">
          Neo - Asistente IA
        </h3>
        <aside className="md:flex justify-between gap-4">
          <button
            onClick={newChat}
            className="text-blue-500 hover:text-blue-700 flex items-center gap-1 group"
            title="Nuevo chat"
          >
            <RefreshCw
              size={18}
              className="group-hover:rotate-180 transition-all duration-300"
            />
            Nuevo Chat
          </button>
          <label htmlFor="tempValue" className="flex gap-2 items-center">
            Aleatoriedad{" "}
            <small
              className={`group px-1 rounded-[3px] border border-zinc-200/70
                 dark:border-zinc-700 ${shareTechMono.className} hover:bg-zinc-200/70 relative`}
            >
              i
              <div className="group-hover:flex absolute top-2 left-2 hidden w-48 bg-zinc-300 dark:bg-zinc-700 z-50 p-3 rounded-lg">
                <small className="text-[12px]">
                  Controla el aspecto de aleatoriedad en la selección de tokens
                  que el modelo elige para la salida. Un valor de 0.8 es un buen
                  punto de partida para experimentar. Los valores más bajos se
                  usan en tareas con una respuesta correcta (por ejemplo,
                  preguntas y respuestas o resúmenes). Los valores más altos
                  aumentan la creatividad o variabilidad en la salida.
                </small>
              </div>
            </small>
            <input
              type="range"
              name="tempValue"
              min="0.1"
              max="1.0"
              step="0.1"
              value={tempValue}
              onChange={(e) => setTempValue(parseFloat(e.target.value))}
              className="w-full appearance-none h-2 bg-zinc-300 rounded-full
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:bg-blue-500
             [&::-webkit-slider-thumb]:cursor-pointer
             [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
             [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full"
            />
            <span className="w-6">{tempValue}</span>
          </label>
          <label htmlFor="language" className="flex gap-2 items-center">
            Idioma <Mic size={16} />
            <select
              name="language"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="rounded bg-zinc-100 text-zinc-800"
            >
              {navLanguages.map((lang) => {
                return (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                );
              })}
            </select>
          </label>
        </aside>
      </div>

      <div
        className={`h-[100%] pl-4 pb-4 pr-[10px] md:pt-14 pt-3 flex flex-col gap-4 overflow-y-hidden ${styles.scroll}`}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl md:max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 dark:bg-blue-900/50"
                : "mr-auto bg-zinc-100 dark:bg-zinc-700/50"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="relative text-black dark:text-white">
                <span className="absolute -top-[56px] bg-zinc-100 dark:bg-zinc-700/50 -z-10 -left-3 px-2 py-2 rounded-full md:flex hidden">
                  <Image
                    src="/assets/neo_pixelart-removebg-preview.png"
                    width={24}
                    height={24}
                    alt="The Neo Protagonist"
                  />
                </span>
                <MarkdownRenderer content={msg.content} />
                <span ref={chatRef}></span>
              </div>
            ) : (
              <p ref={thinkRef}>{msg.content}</p>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="loader-container pl-2 my-3 animate-pulse text-zinc-500">
            Pensando<span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
      </div>

      <section className="w-full absolute bottom-0 left-0 z-50 bg-[#FFFFFF] dark:bg-zinc-900 border-t border-zinc-200/70 dark:border-zinc-800">
        <form
          onSubmit={submit}
          className="p-6 flex justify-between gap-2 relative"
        >
          <textarea
            className={`md:w-11/12 w-10/12 p-2 border bg-transparent dark:border-zinc-800 border-zinc-300/70 rounded-lg outline-none focus:outline-blue-500 ${styles.assistant}`}
            onChange={handleInputChange}
            maxLength={300}
            value={query}
            ref={refTextarea}
            onInput={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit(e);
                setQuery("");
              }
            }}
            rows={1}
            placeholder="Pregunta lo que quieras"
          />
          <button
            onClick={handleOnRecord}
            type="button"
            className={`absolute md:right-[76px] right-16 top-[50%] -translate-y-[50%] px-2 py-2 border border-zinc-200/70 
              dark:border-zinc-500 outline-[2px] outline-offset-2 outline-blue-500 hover:outline-double rounded-full 
              bg-gradient-to-b from-blue-500 to-blue-700 ${
                isMicActive ? "from-red-500 to-red-700" : ""
              }`}
          >
            <Mic className="text-zinc-100" />
          </button>
          <button
            type="submit"
            disabled={query === "" || isLoading}
            className={`absolute md:right-6 right-3 top-[50%] -translate-y-[50%] px-2 py-2 border 
              border-zinc-200/70 dark:border-zinc-500 outline-[2px] outline-offset-2 outline-blue-500 
              hover:outline-double rounded-full bg-gradient-to-b from-blue-500 to-blue-700 
               disabled:hover:cursor-not-allowed disabled:grayscale-[70%]`}
          >
            <ArrowUp className="text-zinc-100" />
          </button>
        </form>
      </section>
    </section>
  );
};

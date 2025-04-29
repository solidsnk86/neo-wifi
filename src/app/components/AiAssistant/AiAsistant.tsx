import { FormEvent, useEffect, useRef, useState } from "react";
import MarkdownRenderer from "../MarkDownRender";
import { ArrowUp, RefreshCw, X } from "lucide-react";
import styles from "./styles/assistant.module.css";
import Image from "next/image";

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
  closeAssistant,
}: {
  closeAssistant: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hola! en que puedo ayudarte?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const thinkRef = useRef<HTMLDivElement>(null);

  const sendQuery = async (text: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/neo-ai/?query=${encodeURIComponent(text)}`);
      const data: ContextAIProps = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.context.message.content[0].text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;

    const userMessage: Message = { role: "user", content: query.trim() };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    await sendQuery(query.trim());
    const [clientData] = await Promise.all([
      (await fetch("https://solid-geolocation.vercel.app/location")).json(),
    ]);
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
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    thinkRef.current?.scrollIntoView({ behavior: "auto" });
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const newChat = () => {
    setMessages([]);
    setQuery("");
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
  }, []);

  return (
    <section
      className="md:w-11/12 w-full mx-auto h-screen flex-col gap-2 border-x-2 border-t-2 border-zinc-200/70 dark:border-zinc-800 md:rounded-t-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl overflow-hidden chat"
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
            className="group-hover:text-red-400 group-hover:bg-zinc-700/50 rounded-md text-black dark:text-white"
          />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white text-center font-['bogue-black']">
          ¿Necesitas ayuda con la documentación?
        </h3>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={300}
            ref={refTextarea}
            onInput={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery("");
                submit(e);
              }
            }}
            rows={1}
            placeholder="Pregunta lo que quieras"
          />
          <button
            type="submit"
            disabled={query === "" || isLoading}
            className="absolute md:right-6 right-3 top-[50%] -translate-y-[50%] px-2 py-2 border border-zinc-200/70 dark:border-zinc-500 outline-[1px] outline-black dark:outline-zinc-900 outline-double rounded-full bg-gradient-to-b from-blue-500 to-blue-700 hover:opacity-80 disabled:hover:cursor-not-allowed disabled:grayscale-[70%] transition-all duration-500"
          >
            <ArrowUp className="text-zinc-100" />
          </button>
        </form>
      </section>
    </section>
  );
};

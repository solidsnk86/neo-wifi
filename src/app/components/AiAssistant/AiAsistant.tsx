import { FormEvent, useEffect, useRef, useState } from "react";
import MarkdownRenderer from "../MarkDownRender";
import { HomeBlock } from "../BlockComp";
import { ArrowUp, RefreshCw, UserCircle2 } from "lucide-react";
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

export const AiAssistant = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hola soy Neo! en que puedo ayudarte?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

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
    <HomeBlock className="flex-col gap-4">
      <div className="flex flex-col justify-between items-center px-3">
        <h3 className="text-2xl font-semibold text-center font-['bogue-black']">
          ¿Necesitas ayuda con la documentación?
        </h3>
        <button
          onClick={newChat}
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
          title="Nuevo chat"
        >
          <RefreshCw size={18} />
          Nuevo Chat
        </button>
      </div>

      <section className="w-full border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl overflow-hidden">
        <div className="max-h-96 overflow-y-auto p-4 pt-14 flex flex-col gap-4">
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
                <div className="relative" ref={chatRef}>
                  <span className="absolute -top-[56px] bg-zinc-100 dark:bg-zinc-700/50 -z-10 -left-3 px-2 py-2 rounded-full">
                    <Image
                      src="/assets/neo_pixelart-removebg-preview.png"
                      width={24}
                      height={24}
                      alt="The Neo Protagonist"
                    />
                  </span>
                  <MarkdownRenderer content={msg.content} />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute -top-[56px] bg-blue-100 dark:bg-blue-900/50 -z-10 -right-3 px-2 py-2 rounded-full">
                    <UserCircle2
                      className="text-blue-500"
                      width={24}
                      height={24}
                    />
                  </span>

                  <p>{msg.content}</p>
                </div>
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

        <form
          onSubmit={submit}
          className="p-6 flex justify-between gap-2 border-t border-zinc-200/70 dark:border-zinc-800 relative"
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
    </HomeBlock>
  );
};

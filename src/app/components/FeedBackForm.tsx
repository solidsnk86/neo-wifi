"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { PlaneIcon } from "./Icons";
import { showDialog } from "@/utils/dialog";
import { Info, MailCheck } from "lucide-react";
import { socialLinks } from "@/constants";
import Link from "next/link";

export default function FeedBackForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>();
  const [appData, setAppData] = useState<{
    release: { appVersion: string; appInfo: string };
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const [char, setChar] = useState<number>(0);
  const refInput = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_CHAR = 300;

  useEffect(() => {
    const getAppData = async () => {
      return await fetch("/api/releases")
        .then((res) => res.json())
        .then((appData) => setAppData(appData));
    };
    getAppData();
  }, []);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.addEventListener("input", () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    });

    return () => {
      textareaRef.current?.removeEventListener("input", () => {});
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Este campo es obligatorio");
      refInput.current!.style.borderColor = "#f87171";
      return;
    }
    if (!message) {
      setError("Este campo es obligatorio");
      textareaRef.current!.style.borderColor = "#f87171";
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setMessage("");
    setChar(0);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: appData?.release.appVersion,
        email,
        message,
      }),
    });

    const data = await res.json();

    setIsLoading(false);

    if (data.success) {
      setEmail("");
      refInput.current!.style.borderColor = "";
      showDialog({
        content: (
          <div className="flex p-5 flex-col">
            <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
              <MailCheck className="text-blue-500 -translate-y-[1px]" />
              ¡Gracias por tu tiempo!
            </h2>
            <p className="text-black dark:text-zinc-50">{data.message}</p>
          </div>
        ),
      });
    } else {
      showDialog({
        content: (
          <div className="flex flex-col p-5">
            <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
              <Info className="text-red-500 -translate-y-[1px]" />
              Error al informar
            </h2>
            <p className="text-black dark:text-zinc-50">Intente nuevamente.</p>
            <small className="text-red-400">{data.error}</small>
          </div>
        ),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto flex flex-wrap justify-center gap-2 my-16 border bg-[#FFFFFF] dark:bg-zinc-800/40 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 p-6 rounded-2xl relative overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">Envíanos un mensaje</h3>
        <p className="text-zinc-400 text-[15px]">
          Envíame cualquier mensaje o reporta un bug acerca del producto. Si
          necesitas que te conteste o alguna acción por mi parte, por favor
          incluye alguna manera de poder hacer un seguimiento. up.
        </p>
      </div>
      <div className="grid w-full">
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(undefined);
            refInput.current!.style.borderColor = "";
          }}
          ref={refInput}
          className="p-2 border bg-transparent dark:border-zinc-800 border-zinc-300/70 rounded-lg w-full outline-none focus:outline-blue-500 outline-offset-0"
        />
        <textarea
          value={message}
          ref={textareaRef}
          rows={2}
          placeholder="Tu mensaje acá.."
          maxLength={MAX_CHAR}
          onChange={(e) => {
            setMessage(e.target.value);
            setChar(e.target.value.length);
            setError(undefined);
            textareaRef.current!.style.borderColor = "";
          }}
          className="p-2 border resize-none bg-[#fafafa] mt-3 dark:bg-zinc-950/30 dark:border-zinc-800 border-zinc-300/70 rounded-lg w-full outline-none focus:outline-blue-500 outline-offset-0 overflow-y-hidden"
        />
        <div className="w-full flex justify-between items-center my-1 px-1 text-zinc-400">
          <small className="text-[10px]">
            {char}/{MAX_CHAR}
          </small>
          <small className="text-[10px]">(Caracteres máximo {MAX_CHAR})</small>
        </div>
        {error && (
          <small className="text-red-500 dark:text-red-400 font-semibold flex items-center gap-1">
            <span aria-hidden="true" className="text-2xl translate-y-[5px]">
              *
            </span>
            <span>{error}</span>
          </small>
        )}
        <button
          type="submit"
          className="w-full flex gap-2 my-2 items-center justify-center mx-auto p-2 bg-[#facc15] btn text-zinc-900 rounded-full border border-zinc-300/70 dark:border-zinc-500/50"
        >
          {isLoading ? (
            <div className="loader-container">
              Enviando<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          ) : (
            "Dar feedback"
          )}
        </button>
        <small className="text-center text-xs my-4 text-zinc-400">
          O contáctame mediante estos medios
        </small>
        <div className="w-full mb-3">
          <aside className="flex justify-between pt-6 border-t border-zinc-300/70 dark:border-zinc-800/80 px-4">
            {socialLinks.map(({ icon: Icon, url, ariaLabel }) => (
              <Link
                key={ariaLabel}
                href={url}
                aria-label={ariaLabel}
                className="inline-flex hover:scale-105 transition-transform bg-[#fafafa] dark:bg-zinc-800/40 p-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl"
              >
                <Icon className="text-zinc-500" />
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </form>
  );
}

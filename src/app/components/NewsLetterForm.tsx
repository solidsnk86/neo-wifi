"use client";

import { useEffect, useRef, useState } from "react";
import { PlaneIcon } from "./Icons/PlaneIcon";
import { showDialog } from "@/utils/dialog";
import { Info, MailCheck } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [appData, setAppData] = useState<{
    release: { appVersion: string; appInfo: string };
  }>();
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getAppData = async () => {
      return await fetch("/api/releases")
        .then((res) => res.json())
        .then((appData) => setAppData(appData));
    };
    getAppData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Este campo es obligatorio");
      refInput.current!.style.borderColor = "#f87171";
      return;
    }

    setIsLoading(true);
    setError(undefined);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: appData?.release.appVersion,
        email,
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
              ¡Gracias por suscribirte!
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
              Error en la subscripción
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
      className="w-full max-w-lg mx-auto flex flex-wrap gap-2 my-16 border bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 p-3 rounded-2xl relative overflow-hidden"
    >
      <div className="flex gap-3">
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
          className="p-2 border bg-transparent dark:border-zinc-800 border-zinc-300/70 rounded-lg w-full max-w-md md:w-80 outline-none focus:outline-blue-500 outline-offset-0"
        />
        <button
          type="submit"
          className="w-full md:w-fit flex gap-2 items-center justify-center mx-auto p-2 bg-gradient-to-b btn from-blue-500 to-blue-700 text-zinc-50 rounded-md border border-zinc-300/70 dark:border-zinc-500/50"
        >
          <PlaneIcon />
          {isLoading ? (
            <div className="loader-container">
              Enviando<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          ) : (
            "Suscribirme"
          )}
        </button>
      </div>
      {error && (
        <small className="text-red-500 dark:text-red-400 font-semibold flex items-center gap-1">
          <span aria-hidden="true" className="text-2xl translate-y-[5px]">
            *
          </span>
          <span>{error}</span>
        </small>
      )}
    </form>
  );
}

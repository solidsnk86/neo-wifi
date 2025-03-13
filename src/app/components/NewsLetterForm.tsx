"use client";

import { useState } from "react";
import { PlaneIcon } from "./Icons/PlaneIcon";
import { showDialog } from "@/utils/dialog";
import { MailCheck } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage(data.message);
      setEmail("");
      setIsLoading(false);
    } else {
      setMessage("Hubo un error. Intenta de nuevo.");
      setIsLoading(false);
    }
  };

  if (message) {
    showDialog({
      content: (
        <div className="flex p-5 flex-col">
          <h2 className="flex justify-center text-center font-semibold items-center gap-2 my-3">
            <MailCheck className="text-blue-500 -translate-y-[1px]" />
            ¡Gracias por suscribirte!
          </h2>
          <p>{message}</p>
        </div>
      ),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-fit mx-auto md:flex grid gap-3 my-16 border bg-[#FFFFFF] dark:bg-zinc-800/50 backdrop-blur-xl z-50 border-zinc-200/70 dark:border-zinc-800 p-3 rounded-2xl relative text-text-primary overflow-hidden"
    >
      <input
        type="email"
        placeholder="Tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border rounded md:w-80"
      />
      <button
        type="submit"
        className="w-fit mx-auto p-2 bg-gradient-to-b from-blue-500 to-blue-700 text-zinc-50 rounded-md border border-zinc-300/70 dark:border-zinc-500/50 hover:scale-105 transition-transform flex gap-2 items-center"
      >
        <PlaneIcon />
        {isLoading ? "Enviando..." : "Suscribirme"}
      </button>
    </form>
  );
}

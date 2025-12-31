import Image from "next/image";
import { ReactNode } from "react";
import styles from "./components.module.css"

export function StepCard({
  paragraph,
  url,
  info,
  note,
}: {
  paragraph: ReactNode;
  url: string;
  info: string;
  note?: ReactNode;
}) {
  return (
    <div className={`flex justify-center mx-auto flex-col my-6 p-6 max-w-3xl ${styles.scroll__animation}`}>
      <div className="text-left w-full relative">{paragraph}</div>
      <picture className="flex justify-center mx-auto my-6 flex-col">
        <Image
          src={url}
          alt={info}
          width={500}
          height={300}
          className="rounded-lg relative"
        />
        <span className="text-sm text-zinc-500 text-center mt-2 relative">{info}</span>
      </picture>
      {note}
    </div>
  );
}

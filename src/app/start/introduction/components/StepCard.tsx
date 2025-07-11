import Image from "next/image";
import { ReactNode } from "react";

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
    <div className="border-2 border-zinc-200/70 dark:border-zinc-800 rounded-[16px] bg-[#FFFFFF] dark:bg-zinc-800/50 flex justify-center mx-auto flex-col my-6 p-6 relative max-w-3xl backdrop-blur-xl z-50">
      <div className="text-left w-full">{paragraph}</div>
      <picture className="flex justify-center mx-auto my-6 flex-col">
        <Image
          src={url}
          alt={info}
          width={500}
          height={300}
          className="rounded-lg"
        />
        <span className="text-sm text-zinc-500 text-center mt-2">{info}</span>
      </picture>
      {note}
    </div>
  );
}

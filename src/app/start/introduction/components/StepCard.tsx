import Image from "next/image";

export function StepCard({
  paragraph,
  url,
  info,
}: {
  paragraph: React.ReactNode;
  url: string;
  info: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-6 rounded-xl">
      <div className="text-left w-full">{paragraph}</div>
      <Image
        src={url}
        alt={info}
        width={500}
        height={300}
        className="rounded-lg"
      />
      <span className="text-sm text-zinc-500">{info}</span>
    </div>
  );
}

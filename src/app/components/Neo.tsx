import Image from "next/image";

interface NeoProps {
  handlerEvent: () => void;
}

export function Neo({ handlerEvent }: NeoProps) {
  return (
    <div
      className="fixed bottom-4 right-2 px-3 z-50 neo-ai"
      id="neo-ai"
      onClick={handlerEvent}
    >
      <Image
        src="/assets/neo_pixelart-removebg-preview.png"
        width={55}
        height={55}
        alt="The Neo Protagonist"
      />
    </div>
  );
}

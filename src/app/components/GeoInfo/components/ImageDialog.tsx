/* eslint-disable @next/next/no-img-element */
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { closeDialog, showDialog } from "@/utils/dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ImageWithDialogProps {
  children: ReactNode;
  className: string;
  imgInfo?: string;
  urlImg?: string;
}

export default function ImageWithDialog({
  className,
  imgInfo,
  urlImg,
}: Partial<ImageWithDialogProps>) {
  const { width } = useWindowSize();
  return (
    <div
      className={`cursor-pointer w-full ${className}`}
      onClick={() =>
        showDialog({
          width: `${width < 762 ? "100%" : "80%"}`,
          content: imgInfo && (
            <article className="p-2">
              <X
                className="absolute top-2 right-2 text-red-500 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 cursor-pointer rounded-md"
                onClick={closeDialog}
              />
              <img width="100%" height="100%" src={urlImg} alt={imgInfo} />
              <div className="flex mx-auto justify-center my-3">{imgInfo}</div>
            </article>
          ),
        })
      }
    >
      <img
        src={urlImg}
        width={400}
        height={300}
        alt={imgInfo}
        className="flex justify-center mx-auto my-10"
      />
    </div>
  );
}

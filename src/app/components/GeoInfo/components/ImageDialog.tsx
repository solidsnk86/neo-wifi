import { closeDialog, showDialog } from "@/utils/dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ImageWithDialogProps {
  children: ReactNode;
  className: string;
  imgInfo: string;
}

export default function ImageWithDialog({
  children,
  className,
  imgInfo,
}: Partial<ImageWithDialogProps>) {
  return (
    <div
      className={`cursor-pointer w-full ${className}`}
      onClick={() =>
        showDialog({
          content: (
            <>
              <X
                className="absolute top-2 right-2 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 cursor-pointer rounded-md"
                onClick={closeDialog}
              />
              {children}
              <small className="flex mx-auto justify-center my-3">
                {imgInfo}
              </small>
            </>
          ),
        })
      }
    >
      {children}
    </div>
  );
}

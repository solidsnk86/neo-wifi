import { showDialog } from "@/utils/dialog";
import { BadgeInfo, LocateFixed } from "lucide-react";
import { AskForLocationProps } from "../types/definitions";
import { DialogContent } from "./DialogContent";

export const AskForLocation = ({ handler }: AskForLocationProps) => {
  const timerWorker = new Worker(new URL("../../timerWorker.ts", import.meta.url));

  timerWorker.postMessage(0);

  timerWorker.onmessage = (event) => {
    const timer = event.data;

    if (timer === 6) {
      timerWorker.terminate();
      return showDialog({
        content: <DialogContent handler={handler} />,
      });
    }
  };

  return () => {
    timerWorker.terminate();
  };
};

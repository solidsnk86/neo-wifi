"use client";

import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const closeDialog = () => {
  const dialog = document.querySelector("dialog");
  const controller = new AbortController();
  dialog!.style.animation = "slideOutEffect 300ms ease-in-out";

  dialog!.addEventListener(
    "animationend",
    () => {
      dialog!.close();
      dialog!.remove();
      controller.abort();
    },
    { once: true, signal: controller.signal }
  );
};

export const showDialog = ({
  content,
  width,
}: {
  content: ReactNode;
  width?: string;
  height?: string;
}) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);
  const root = createRoot(dialog);
  root.render(content);
  dialog.style.width = width || "";
  dialog.showModal();

  const controller = new AbortController();

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOutEffect 300ms ease-in-out";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  document.addEventListener(
    "click",
    (event: MouseEvent) => {
      const firstChildDialog = document.querySelector("dialog")?.children[0];
      if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
        closeDialogWithAnimation();
      }
    },
    { signal: controller.signal }
  );
};

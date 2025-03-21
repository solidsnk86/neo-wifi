import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const closeDialogWithAnimation = () => {
  const dialog = document.createElement("dialog");
  const controller = new AbortController();
  const root = createRoot(dialog);
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

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement("dialog");
  const controller = new AbortController();
  const root = createRoot(dialog);
  document.body.appendChild(dialog);
  root.render(content);
  dialog.showModal();

  document.documentElement.addEventListener(
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

import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const showDeliciusToast = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);
  const root = createRoot(dialog);
  root.render(content);

  dialog.showModal();

  const controller = new AbortController();
  dialog.style.animation = "toastyIn 0.3s ease-in-out";
  const closeWithEffect = () => {
    dialog.style.animation = "toastyOut 0.3s ease-in-out";

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

  document.documentElement.addEventListener(
    "click",
    (event: MouseEvent) => {
      const firstChildDialog = document.querySelector("dialog")?.children[0];
      if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
        closeWithEffect();
      }
    },
    { signal: controller.signal }
  );
};

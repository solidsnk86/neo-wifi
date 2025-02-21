import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const showDialog = ({ content }: { content: ReactNode }) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);
  const root = createRoot(dialog);
  root.render(content);

  dialog.showModal();

  const closeDialogWithAnimation = () => {
    if (dialog.getAttribute("data-closing") === "true") return;
    dialog.setAttribute("data-closing", "true");

    dialog.style.animation = "slideOutEffect 300ms ease-in-out";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
      },
      { once: true }
    );
  };

  document.addEventListener(
    "click",
    (event: MouseEvent) => {
      if (dialog.contains(event.target as Node)) {
        closeDialogWithAnimation();
      }
    },
    { once: true }
  );
};

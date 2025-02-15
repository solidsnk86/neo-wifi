export const showDialog = ({ content }: { content: string }) => {
  if (!content) return;

  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<div>${content}</div>`;
  document.body.appendChild(dialog);
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

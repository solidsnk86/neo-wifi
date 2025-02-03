export const showDialog = ({ content }: { content: string }) => {
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<div>${content}</div>`;
  if (content !== "undefined") {
    document.body.appendChild(dialog);
    dialog.showModal();
  }
  document.addEventListener("click", (event: MouseEvent) => {
    if (dialog && dialog.contains(event.target as Node)) {
      dialog.close();
    }
  });
};

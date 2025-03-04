export const formatDate = (str: string | Date | number) => {
  const date = new Date(str).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return date;
};

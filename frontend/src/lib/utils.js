export const capitialize = (str) => {
  if (typeof str !== "string") return "";  // Prevención de errores
  return str.charAt(0).toUpperCase() + str.slice(1);
};

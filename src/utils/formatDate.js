export const formatDate = (date) => {
  const formatedDate = new Date(date);
  return formatedDate.toLocaleDateString('pt-BR');
}
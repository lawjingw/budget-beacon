export const getTodayString = function () {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

export const getToday = function () {
  const today = new Date();
  return today.setUTCHours(0, 0, 0, 0);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

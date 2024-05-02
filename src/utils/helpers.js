import { subMonths } from "date-fns";

export const getTodayString = (day = "") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayStr = day
    ? day.padStart(2, "0")
    : String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${dayStr}`;
  return formattedDate;
};

export const backMonth = (numMonth, day = "") => {
  const date = subMonths(new Date(), numMonth);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayStr = day
    ? day.padStart(2, "0")
    : String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${dayStr}`;
  return formattedDate;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "GBP" }).format(
    value
  );

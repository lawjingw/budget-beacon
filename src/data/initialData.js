import { getToday } from "../utils/helpers";

export const budgets = [
  { category: "Rent", month: getToday() },
  { category: "Utilities", month: getToday() },
  { category: "Groceries", month: getToday() },
  { category: "Dining out", month: getToday() },
  { category: "Entertainment", month: getToday() },
  { category: "Clothing", month: getToday() },
  { category: "Gas", month: getToday() },
  { category: "Fitness", month: getToday() },
  { category: "Music", month: getToday() },
  { category: "Vacation", month: getToday() },
];

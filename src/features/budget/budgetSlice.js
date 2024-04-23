import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../../utils/helpers";

const today = getToday();
export const initialState = [
  {
    id: "1",
    category: "🏠 Rent",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "2",
    category: "🔌 Utilities",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "3",
    category: "🛒 Groceries",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "4",
    category: "🍽 Dining out",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "5",
    category: "🕹 Entertainment",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "6",
    category: "👗 Clothing",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "7",
    category: "⛽ Gas",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "8",
    category: "🥊 Fitness",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "9",
    category: "🎧 Music",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    id: "10",
    category: "🏖 Vacation",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
];

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    assignBudget(state, action) {
      const { category, assigned } = action.payload;
      const existingCategory = state.find(
        (budget) => budget.category === category
      );
      existingCategory.assigned = Number(assigned);
      existingCategory.available =
        existingCategory.assigned - existingCategory.activity;
    },
  },
});

export const selectTotalAssigned = (state) =>
  state.budget.reduce((sum, item) => sum + item.assigned, 0);

export const selectCategoryById = (state, id) =>
  state.budget.find((category) => category.id === id)?.category;

export const { assignBudget } = budgetSlice.actions;

export default budgetSlice.reducer;

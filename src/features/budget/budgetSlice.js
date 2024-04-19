import { createSlice } from "@reduxjs/toolkit";
import { getToday } from "../../utils/helpers";

const today = getToday();
export const initialState = [
  {
    category: "Rent",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Utilities",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Groceries",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Dining out",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Entertainment",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Clothing",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Gas",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Fitness",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Music",
    assigned: 0,
    activity: 0,
    available: 0,
    target: 0,
    month: today,
  },
  {
    category: "Vacation",
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
  reducers: {},
});

export const selectTotalAssigned = (state) =>
  state.budget.reduce((sum, item) => sum + item.assigned, 0);

export default budgetSlice.reducer;

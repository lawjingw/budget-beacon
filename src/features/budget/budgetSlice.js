import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  readyToAssign: 3000,
  budgets: [
    {
      id: "1",
      category: "🏠 Rent",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "2",
      category: "🔌 Utilities",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "3",
      category: "🛒 Groceries",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "4",
      category: "🍽 Dining out",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "5",
      category: "🕹 Entertainment",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "6",
      category: "👗 Clothing",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "7",
      category: "⛽ Gas",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "8",
      category: "🥊 Fitness",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "9",
      category: "🎧 Music",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "10",
      category: "🏖 Vacation",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "11",
      category: "💻 Internet",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "12",
      category: "📄 Insurance",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "13",
      category: "📺 TV streaming",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "14",
      category: "📱 Cell phone",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
    {
      id: "15",
      category: "🚇 Transportation",
      assigned: 0,
      activity: 0,
      available: 0,
      target: 0,
    },
  ],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    assignBudget(state, action) {
      const { budgetId, assigned } = action.payload;
      const categoryBudget = state.budgets.find(
        (budget) => budget.id === budgetId
      );
      categoryBudget.assigned = assigned;
      categoryBudget.available =
        categoryBudget.assigned + categoryBudget.activity;
    },
    updateTarget(state, action) {
      const { budgetId, target } = action.payload;
      const categoryBudget = state.budgets.find(
        (budget) => budget.id === budgetId
      );
      categoryBudget.target = target;
    },
    spend(state, action) {
      const { budgetId, amount } = action.payload;
      const categoryBudget = state.budgets.find(
        (budget) => budget.id === budgetId
      );
      categoryBudget.activity = categoryBudget.activity - amount;
      categoryBudget.available =
        categoryBudget.assigned + categoryBudget.activity;
    },
    fund(state, action) {
      const { budgetId, amount } = action.payload;
      const categoryBudget = state.budgets.find(
        (budget) => budget.id === budgetId
      );
      categoryBudget.activity = categoryBudget.activity + amount;
      categoryBudget.available =
        categoryBudget.assigned + categoryBudget.activity;
    },
    increaseReadyToAssign(state, action) {
      state.readyToAssign = state.readyToAssign + action.payload;
    },
    decreaseReadyToAssign(state, action) {
      state.readyToAssign = state.readyToAssign - action.payload;
    },
  },
});

export const selectReadyToAssign = (state) => state.budget.readyToAssign;

export const selectBudgets = (state) => state.budget.budgets;

export const selectTotalAssigned = (state) =>
  state.budget.budgets.reduce((sum, item) => sum + item.assigned, 0);

export const selectTotalActivity = (state) =>
  state.budget.budgets.reduce((sum, item) => sum + item.activity, 0);

export const selectTotalAvailable = (state) =>
  state.budget.budgets.reduce((sum, item) => sum + item.available, 0);

export const selectBudgetById = (state, id) =>
  state.budget.budgets.find((categoryBudget) => categoryBudget.id === id);

export const selectCategoryById = (state, id) =>
  id === "readyToAssign"
    ? "Ready to Assign"
    : state.budget.budgets.find((categoryBudget) => categoryBudget.id === id)
        ?.category;

export const {
  assignBudget,
  updateTarget,
  spend,
  fund,
  increaseReadyToAssign,
  decreaseReadyToAssign,
} = budgetSlice.actions;

export default budgetSlice.reducer;

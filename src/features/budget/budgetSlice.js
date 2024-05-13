import { createSlice } from "@reduxjs/toolkit";
import { floatify, formatCurrency } from "../../utils/helpers";

export const initialState = {
  readyToAssign: 0,
  budgets: [],
};

const calActivity = (transactions) =>
  transactions.reduce(
    (sum, transaction) =>
      transaction.cashFlow === "outflow"
        ? floatify(sum - transaction.amount)
        : floatify(sum + transaction.amount),
    0
  );

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
    },
    updateTarget(state, action) {
      const { budgetId, target } = action.payload;
      const categoryBudget = state.budgets.find(
        (budget) => budget.id === budgetId
      );
      categoryBudget.target = target;
    },
    updateActivity(state, action) {
      const { budgetId, transactions } = action.payload;
      if (budgetId === "readyToAssign") {
        state.readyToAssign = calActivity(transactions);
      } else {
        const categoryBudget = state.budgets.find(
          (budget) => budget.id === budgetId
        );
        categoryBudget.activity = calActivity(transactions);
      }
    },
  },
});

export const selectReadyToAssign = (state) =>
  state.budget.readyToAssign -
  state.budget.budgets.reduce((sum, item) => sum + item.assigned, 0);

export const selectBudgets = (state) => state.budget.budgets;

export const selectTotalAssigned = (state) =>
  state.budget.budgets.reduce((sum, item) => sum + item.assigned, 0);

export const selectTotalActivity = (state) =>
  state.budget.budgets.reduce(
    (sum, categoryBudget) => sum + categoryBudget.activity,
    0
  );

export const selectActivityById = (state, id) =>
  state.budget.budgets.find((categoryBudget) => categoryBudget.id === id)
    ?.activity;

export const selectBudgetById = (state, id) =>
  state.budget.budgets.find((categoryBudget) => categoryBudget.id === id);

export const selectCategoryById = (state, id) =>
  id === "readyToAssign"
    ? "Ready to Assign"
    : state.budget.budgets.find((categoryBudget) => categoryBudget.id === id)
        ?.category;

export const selectCategoryOptions = (state) =>
  state.budget.budgets.map((categoryBudget) => {
    const available = categoryBudget.assigned + categoryBudget.activity;
    return {
      value: categoryBudget.id,
      label: `${categoryBudget.category} [${formatCurrency(available)}]`,
    };
  });

export const { assignBudget, updateTarget, updateActivity } =
  budgetSlice.actions;

export default budgetSlice.reducer;

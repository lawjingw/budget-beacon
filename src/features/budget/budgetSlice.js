import { createSlice } from "@reduxjs/toolkit";
import { formatCurrency, getTodayString } from "../../utils/helpers";
import { v4 as uuid } from "uuid";

export const initialState = {
  readyToAssign: 3000,
  transactions: [
    {
      id: uuid(),
      date: getTodayString("1"),
      payee: "Starting Balance",
      budgetId: "readyToAssign",
      memo: "",
      cashFlow: "inflow",
      amount: 3000,
    },
  ],
  budgets: [
    {
      id: "1",
      category: "🏠 Rent",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "2",
      category: "🔌 Utilities",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "3",
      category: "🛒 Groceries",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "4",
      category: "🍽 Dining out",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "5",
      category: "🕹 Entertainment",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "6",
      category: "👗 Clothing",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "7",
      category: "⛽ Gas",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "8",
      category: "🥊 Fitness",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "9",
      category: "🎧 Music",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "10",
      category: "🏖 Vacation",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "11",
      category: "💻 Internet",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "12",
      category: "📄 Insurance",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "13",
      category: "📺 TV streaming",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "14",
      category: "📱 Cell phone",
      assigned: 0,
      activity: 0,
      target: 0,
    },
    {
      id: "15",
      category: "🚇 Transportation",
      assigned: 0,
      activity: 0,
      target: 0,
    },
  ],
};

const calActivity = (transactions) =>
  transactions.reduce(
    (sum, transaction) =>
      transaction.cashFlow === "outflow"
        ? sum - transaction.amount
        : sum + transaction.amount,
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
    addTransaction: {
      reducer(state, action) {
        state.transactions.push(action.payload);
      },
      prepare(transaction) {
        return {
          payload: {
            id: uuid(),
            ...transaction,
          },
        };
      },
    },
    delTransaction(state, action) {
      state.transactions.splice(
        state.transactions.findIndex(
          (transaction) => transaction.id === action.payload
        ),
        1
      );
    },
    updateTransaction(state, action) {
      const { transactionId, transaction } = action.payload;
      const existingTransaction = state.transactions.find(
        (transaction) => transaction.id === transactionId
      );
      existingTransaction.date = transaction.date;
      existingTransaction.payee = transaction.payee;
      existingTransaction.category = transaction.category;
      existingTransaction.cashFlow = transaction.cashFlow;
      existingTransaction.amount = transaction.amount;
      existingTransaction.memo = transaction.memo;
    },
    updateActivity(state, action) {
      const transactions = state.transactions.filter(
        (trans) => trans.budgetId === action.payload
      );
      if (action.payload === "readyToAssign") {
        state.readyToAssign = calActivity(transactions);
      } else {
        const categoryBudget = state.budgets.find(
          (budget) => budget.id === action.payload
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
    const activity = categoryBudget.activity;
    const available = categoryBudget.assigned + activity;
    return {
      value: categoryBudget.id,
      label: `${categoryBudget.category} [${formatCurrency(available)}]`,
    };
  });

export const {
  assignBudget,
  updateTarget,
  addTransaction,
  updateTransaction,
  delTransaction,
  updateActivity,
} = budgetSlice.actions;

export default budgetSlice.reducer;

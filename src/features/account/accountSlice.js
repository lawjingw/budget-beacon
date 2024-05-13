import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { updateActivity } from "../budget/budgetSlice";
import { floatify, getTodayString } from "../../utils/helpers";
import { isSameMonth, startOfMonth, startOfYear, subMonths } from "date-fns";

const initialState = {
  name: "",
  currentBalance: 0,
  transactions: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount(state, action) {
      const { name, currentBalance } = action.payload;
      state.name = name;
      state.currentBalance = currentBalance;
    },
    updateCurrentBalance(state) {
      state.currentBalance = state.transactions.reduce(
        (sum, transaction) =>
          transaction.cashFlow === "outflow"
            ? floatify(sum - transaction.amount)
            : floatify(sum + transaction.amount),
        0
      );
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
  },
});

export const selectCurrentBalance = (state) => state.account.currentBalance;

export const selectTransactions = (state, filter = "all", sortBy = null) => {
  let transactions = state.account.transactions;

  let queryDate = null;
  if (filter === "this-month") {
    queryDate = startOfMonth(new Date());
  } else if (filter === "3-months") {
    queryDate = startOfMonth(subMonths(new Date(), 2));
  } else if (filter === "this-year") {
    queryDate = startOfYear(new Date());
  }

  if (queryDate)
    transactions = transactions.filter(
      (trans) => new Date(trans.date) >= queryDate
    );

  if (sortBy) {
    const [field, order] = sortBy.split("-");
    transactions = [...transactions].sort((a, b) => {
      if (a[field] < b[field]) return order === "desc" ? 1 : -1;
      if (a[field] > b[field]) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  return transactions;
};

export const {
  updateAccount,
  updateCurrentBalance,
  addTransaction,
  updateTransaction,
  delTransaction,
} = accountSlice.actions;

export const updateAccountThunk =
  (account, balanceDiff) => (dispatch, getState) => {
    dispatch(updateAccount(account));

    if (balanceDiff !== 0) {
      const transaction = {
        date: getTodayString(),
        payee: "Manual Balance Adjustment",
        budgetId: "readyToAssign",
        memo: "",
        cashFlow: balanceDiff < 0 ? "outflow" : "inflow",
        amount: Math.abs(balanceDiff),
      };
      dispatch(addTransaction(transaction));

      const transactions = getState().account.transactions.filter(
        (trans) =>
          trans.budgetId === transaction.budgetId &&
          isSameMonth(new Date(trans.date), new Date())
      );

      dispatch(
        updateActivity({
          budgetId: transaction.budgetId,
          transactions: transactions,
        })
      );
    }
  };

export const addTransactionThunk = (transaction) => (dispatch, getState) => {
  dispatch(addTransaction(transaction));

  const transactions = getState().account.transactions.filter(
    (trans) =>
      trans.budgetId === transaction.budgetId &&
      isSameMonth(new Date(trans.date), new Date())
  );

  dispatch(
    updateActivity({
      budgetId: transaction.budgetId,
      transactions: transactions,
    })
  );

  dispatch(updateCurrentBalance());
};

export const updateTransactionThunk =
  (transactionId, transaction) => (dispatch, getState) => {
    dispatch(
      updateTransaction({
        transactionId: transactionId,
        transaction: transaction,
      })
    );

    const transactions = getState().account.transactions.filter(
      (trans) =>
        trans.budgetId === transaction.budgetId &&
        isSameMonth(new Date(trans.date), new Date())
    );

    dispatch(
      updateActivity({
        budgetId: transaction.budgetId,
        transactions: transactions,
      })
    );

    dispatch(updateCurrentBalance());
  };

export const delTransactionThunk =
  (transactionId, budgetId) => (dispatch, getState) => {
    dispatch(delTransaction(transactionId));

    const transactions = getState().account.transactions.filter(
      (trans) =>
        trans.budgetId === budgetId &&
        isSameMonth(new Date(trans.date), new Date())
    );

    dispatch(
      updateActivity({
        budgetId: budgetId,
        transactions: transactions,
      })
    );

    dispatch(updateCurrentBalance());
  };

export default accountSlice.reducer;

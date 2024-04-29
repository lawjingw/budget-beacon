import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  name: "My account",
  currentBalance: 3000,
  transactions: [],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount(state, action) {
      state.name = action.payload.name;
      state.currentBalance = action.payload.currentBalance;
    },
    createTransaction: {
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
    delTransaction(state, action) {
      state.transactions.splice(
        state.transactions.findIndex(
          (transaction) => transaction.id === action.payload
        ),
        1
      );
    },
  },
});

export const selectCurrentBalance = (state) => state.account.currentBalance;

export const selectTransactions = (state) => state.account.transactions;

export const {
  updateAccount,
  createTransaction,
  updateTransaction,
  delTransaction,
} = accountSlice.actions;

export default accountSlice.reducer;

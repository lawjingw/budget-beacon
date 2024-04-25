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
  },
});

export const selectCurrentBalance = (state) => state.account.currentBalance;

export const selectTransactions = (state) => state.account.transactions;

export const { updateAccount, createTransaction } = accountSlice.actions;

export default accountSlice.reducer;

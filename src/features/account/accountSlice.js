import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "My account",
  currentBalance: 3000,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount(state, action) {
      state.name = action.payload.name;
      state.currentBalance = action.payload.currentBalance;
    },
  },
});

export const selectCurrentBalance = (state) => state.account.currentBalance;

export const { updateAccount } = accountSlice.actions;

export default accountSlice.reducer;

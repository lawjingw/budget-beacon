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
      const { name, currentBalance } = action.payload;
      state.name = name;
      state.currentBalance = currentBalance;
    },
  },
});

export const selectCurrentBalance = (state) => state.account.currentBalance;

export const { updateAccount } = accountSlice.actions;

export default accountSlice.reducer;

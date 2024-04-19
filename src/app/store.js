import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../features/account/accountSlice";
import budgetReducer from "../features/budget/budgetSlice";

export default configureStore({
  reducer: {
    account: accountReducer,
    budget: budgetReducer,
  },
});

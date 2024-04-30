import {
  decreaseReadyToAssign,
  fund,
  increaseReadyToAssign,
  spend,
} from "./budgetSlice";

export function changeBudget(transaction, dispatch) {
  const { budgetId, cashFlow, amount } = transaction;
  if (budgetId === "readyToAssign") {
    dispatch(
      cashFlow === "inflow"
        ? increaseReadyToAssign(amount)
        : decreaseReadyToAssign(amount)
    );
  } else {
    dispatch(
      cashFlow === "inflow"
        ? fund({ budgetId, amount })
        : spend({ budgetId, amount })
    );
  }
}

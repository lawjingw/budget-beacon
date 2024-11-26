import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import TransactionRow from "../../../src/features/account/TransactionRow";
import accountReducer from "../../../src/features/account/accountSlice";
import budgetReducer from "../../../src/features/budget/budgetSlice";
import { formatCurrency } from "../../../src/utils/helpers";

describe("TransactionRow", () => {
  const transaction = {
    id: "1",
    date: "2023-10-01",
    payee: "Grocery Store",
    budgetId: "2",
    memo: "Weekly groceries",
    cashFlow: "outflow",
    amount: 50,
  };

  const category = "Groceries";

  const renderWithProviders = (
    ui,
    {
      preloadedState = {},
      store = configureStore({
        reducer: { account: accountReducer, budget: budgetReducer },
        preloadedState,
      }),
    } = {}
  ) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it("renders transaction details", () => {
    renderWithProviders(<TransactionRow transaction={transaction} />, {
      preloadedState: {
        budget: {
          budgets: [
            {
              id: "2",
              category: category,
            },
          ],
        },
      },
    });

    expect(screen.getByText(transaction.date)).toBeInTheDocument();
    expect(screen.getByText(transaction.payee)).toBeInTheDocument();
    expect(screen.getByText(category)).toBeInTheDocument();
    expect(screen.getByText(transaction.memo)).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(transaction.amount))
    ).toBeInTheDocument();
  });

  it("opens edit modal when edit button is clicked", async () => {
    renderWithProviders(<TransactionRow transaction={transaction} />, {
      preloadedState: {
        budget: {
          categories: {
            2: category,
          },
        },
      },
    });

    await userEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(screen.getByText(/edit transaction/i)).toBeInTheDocument();
  });

  it("opens confirm delete modal when delete button is clicked", async () => {
    renderWithProviders(<TransactionRow transaction={transaction} />, {
      preloadedState: {
        budget: {
          categories: {
            2: category,
          },
        },
      },
    });

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(screen.getByText(/confirm delete/i)).toBeInTheDocument();
  });
});

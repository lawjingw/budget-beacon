import { render, screen } from "@testing-library/react";
import CategoriesSpending from "../../../src/features/reports/CategoriesSpending";
import { Provider } from "react-redux";

describe("CategoriesSpending", () => {
  const transactions = [
    { budgetId: "1", cashFlow: "outflow", amount: 100 },
    { budgetId: "2", cashFlow: "inflow", amount: 50 },
    { budgetId: "1", cashFlow: "outflow", amount: 200 },
    { budgetId: "3", cashFlow: "outflow", amount: 300 },
    { budgetId: "2", cashFlow: "outflow", amount: 150 },
  ];

  const renderComponent = (transactions) => {
    const createMockStore = (initialState) => ({
      getState: () => initialState,
      subscribe: () => {},
      dispatch: vi.fn(),
    });

    const store = createMockStore({
      budget: {
        budgets: [
          {
            id: "1",
            category: "🏠 Rent",
            group: "Bills",
            assigned: 800,
            activity: -800,
            target: 800,
          },
          {
            id: "2",
            category: "🔌 Utilities",
            group: "Bills",
            assigned: 150,
            activity: -102.6,
            target: 0,
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <CategoriesSpending transactions={transactions} />
      </Provider>
    );
  };

  it("renders without crashing", () => {
    renderComponent(transactions);
  });

  it("displays the correct spending summary", () => {
    renderComponent(transactions);

    const billsGroup = screen.getByText("Bills");
    const needsGroup = screen.getByText("Needs");
    const wantsGroup = screen.getByText("Wants");

    expect(billsGroup).toBeInTheDocument();
    expect(needsGroup).toBeInTheDocument();
    expect(wantsGroup).toBeInTheDocument();
  });
});

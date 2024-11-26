import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import Spending from "../../../src/features/reports/Spending";
import { formatCurrency } from "../../../src/utils/helpers";

const createMockStore = (initialState) => ({
  getState: () => initialState,
  subscribe: () => {},
  dispatch: vi.fn(),
});

describe("Spending Component", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      budget: {
        budgets: [
          {
            id: "1",
            category: "Food",
            group: "Bills",
            assigned: 800,
            activity: -800,
            target: 800,
          },
          {
            id: "2",
            category: "Transport",
            group: "Bills",
            assigned: 150,
            activity: -102.6,
            target: 0,
          },
        ],
      },
    });
  });

  it("should render the category and formatted spending", () => {
    const spendingByCategory = { budgetId: 1, spending: 1000 };

    const { getByText } = render(
      <Provider store={store}>
        <Spending spendingByCategory={spendingByCategory} />
      </Provider>
    );

    expect(getByText(formatCurrency(1000))).toBeInTheDocument();
  });

  it("should render the correct category for a different budgetId", () => {
    const spendingByCategory = { budgetId: 2, spending: 500 };

    const { getByText } = render(
      <Provider store={store}>
        <Spending spendingByCategory={spendingByCategory} />
      </Provider>
    );

    expect(getByText(formatCurrency(500))).toBeInTheDocument();
  });

  it("should render nothing if the category is not found", () => {
    const spendingByCategory = { budgetId: 3, spending: 200 };

    const { queryByText } = render(
      <Provider store={store}>
        <Spending spendingByCategory={spendingByCategory} />
      </Provider>
    );

    expect(queryByText("Food")).not.toBeInTheDocument();
    expect(queryByText("Transport")).not.toBeInTheDocument();
    expect(queryByText(formatCurrency(200))).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import AccountBalance from "../../../src/features/account/AccountBalance";
import { formatCurrency } from "../../../src/utils/helpers";

describe("AccountBalance Component", () => {
  const renderComponent = () => {
    const createMockStore = (initialState) => ({
      getState: () => initialState,
      subscribe: () => {},
      dispatch: vi.fn(),
    });

    const store = createMockStore({
      account: {
        name: "Test Account",
        currentBalance: 1000,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <AccountBalance />
      </Provider>
    );

    return { getByText };
  };

  it("should display the account name", () => {
    const { getByText } = renderComponent();

    expect(getByText("Test Account")).toBeInTheDocument();
  });

  it("should display the formatted current balance", () => {
    const { getByText } = renderComponent();

    expect(getByText(formatCurrency(1000))).toBeInTheDocument();
  });
});

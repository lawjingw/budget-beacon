import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ModalContext } from "../../../src/ui/ModalContext";
import EditAccountForm from "../../../src/features/account/EditAccountForm";
import { updateAccountThunk } from "../../../src/features/account/accountSlice";
import { vi } from "vitest";

vi.mock("../../../src/features/account/accountSlice", () => ({
  updateAccountThunk: vi.fn(),
}));

describe("EditAccountForm", () => {
  const closeModal = vi.fn();

  const renderComponent = () => {
    const user = userEvent.setup();

    const createMockStore = (initialState) => ({
      getState: () => initialState,
      subscribe: () => {},
      dispatch: vi.fn(),
    });

    const store = createMockStore({
      account: {
        name: "Test Account",
        balance: 1000,
      },
    });

    render(
      <Provider store={store}>
        <ModalContext.Provider value={{ close: closeModal }}>
          <EditAccountForm />
        </ModalContext.Provider>
      </Provider>
    );

    return { user };
  };

  it("renders the form with default values", () => {
    renderComponent();

    expect(screen.getByLabelText(/Account Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Balance/i)).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const { user } = renderComponent();

    await user.clear(screen.getByLabelText(/Account Name/i));
    await user.clear(screen.getByLabelText(/Current Balance/i));
    await user.click(screen.getByRole("button", { name: /Save/i }));

    expect(await screen.findAllByText(/This field is required/i)).toHaveLength(
      2
    );
  });

  it("dispatches updateAccountThunk on form submit", async () => {
    const { user } = renderComponent();

    await user.type(screen.getByLabelText(/Account Name/i), "Updated Account");
    await user.clear(screen.getByLabelText(/Current Balance/i));
    await user.type(screen.getByLabelText(/Current Balance/i), "2000");
    await user.click(screen.getByRole("button", { name: /Save/i }));

    expect(updateAccountThunk).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal on cancel button click", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(closeModal).toHaveBeenCalled();
  });
});

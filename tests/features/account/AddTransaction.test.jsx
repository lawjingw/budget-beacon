import { render, screen } from "@testing-library/react";
import AddTransaction from "../../../src/features/account/AddTransaction";

describe("AddTransaction", () => {
  const renderComponent = () => {
    render(<AddTransaction />);
  };

  it("renders Add Transaction button", () => {
    renderComponent();
    const button = screen.getByText(/Add Transaction/i);
    expect(button).toBeInTheDocument();
  });
});

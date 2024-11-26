import { render, screen } from "@testing-library/react";
import Available from "../../../src/features/budget/Available";

describe("Available component", () => {
  it("renders the correct amount when available is positive", () => {
    render(<Available assigned={1000} activity={500} target={0} />);
    expect(screen.getByText(/1,500.00/i)).toBeInTheDocument();
  });

  it("renders the correct amount when available is negative", () => {
    render(<Available assigned={1000} activity={-1500} target={0} />);
    expect(screen.getByText(/500.00/i)).toBeInTheDocument();
  });

  it("applies the correct style when overspending", () => {
    render(<Available assigned={1000} activity={-1500} target={0} />);
    const availableDiv = screen.getByText(/500.00/i).parentElement;
    expect(availableDiv).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
    expect(availableDiv).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });

  it("applies the correct style when target is unmet", () => {
    render(<Available assigned={500} activity={0} target={1000} />);
    const availableDiv = screen.getByText(/500.00/i).parentElement;
    expect(availableDiv).toHaveStyle("color: var(--color-bg-100)");
  });

  it("applies the correct style when target is achieved", () => {
    render(<Available assigned={1000} activity={0} target={1000} />);
    const availableDiv = screen.getByText(/1,000.00/i).parentElement;
    expect(availableDiv).toHaveStyle("color: var(--color-bg-100)");
  });

  it("applies the correct style when available is positive", () => {
    render(<Available assigned={1000} activity={500} target={0} />);
    const availableDiv = screen.getByText(/1,500.00/).parentElement;
    expect(availableDiv).toHaveStyle("color: var(--color-bg-100)");
  });

  it("applies the correct style when unavailable", () => {
    render(<Available assigned={0} activity={0} target={0} />);
    const availableDiv = screen.getByText(/0.00/i).parentElement;
    expect(availableDiv).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });
});

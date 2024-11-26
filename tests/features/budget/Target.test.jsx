import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Target from "../../../src/features/budget/Target";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Target Component", () => {
  window.ResizeObserver = ResizeObserver;
  const categoryBudget = { target: 100 };
  const user = userEvent.setup();

  it("should render Target heading", () => {
    render(<Target categoryBudget={categoryBudget} />);
    expect(screen.getByText("Target")).toBeInTheDocument();
  });

  it("should show EditTarget component when target is greater than 0 and form is not shown", () => {
    render(<Target categoryBudget={categoryBudget} />);
    expect(screen.getByText("Edit Target")).toBeInTheDocument();
  });

  it("should show CreateTarget component when target is 0 and form is not shown", () => {
    const categoryBudgetZero = { target: 0 };
    render(<Target categoryBudget={categoryBudgetZero} />);
    expect(screen.getByText("Create Target")).toBeInTheDocument();
  });

  it("should show TargetForm component when showForm is true", async () => {
    render(<Target categoryBudget={categoryBudget} />);
    await user.click(screen.getByText("Edit Target"));
    expect(screen.getByText("Target Form")).toBeInTheDocument();
  });

  it("should close TargetForm component when closeForm is called", async () => {
    render(<Target categoryBudget={categoryBudget} />);
    await user.click(screen.getByText("Edit Target"));
    await user.click(screen.getByText("Close"));
    expect(screen.queryByText("Target Form")).not.toBeInTheDocument();
  });
});

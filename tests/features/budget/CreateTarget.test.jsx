import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CreateTarget from "../../../src/features/budget/CreateTarget";
import { vi } from "vitest";

describe("CreateTarget Component", () => {
  const categoryBudget = { category: "Groceries" };
  const handleShowForm = vi.fn();

  test("renders the component with correct text", () => {
    render(
      <CreateTarget
        categoryBudget={categoryBudget}
        handleShowForm={handleShowForm}
      />
    );

    expect(
      screen.getByText(/How much do you need for Groceries?/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /When you create a target, we’ll let you know how much money to set aside to stay on track over time./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Create Target/ })
    ).toBeInTheDocument();
  });

  test("calls handleShowForm when button is clicked", async () => {
    render(
      <CreateTarget
        categoryBudget={categoryBudget}
        handleShowForm={handleShowForm}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Create Target/ }));
    expect(handleShowForm).toHaveBeenCalledWith(true);
  });
});

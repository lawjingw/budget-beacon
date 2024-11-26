import { render, screen } from "@testing-library/react";
import Sidebar from "../../src/ui/Sidebar";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar", () => {
  it("renders Sidebar with Logo and MainNav", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    // Check if Logo is rendered
    const logoElement = screen.getByAltText("Logo");
    expect(logoElement).toBeInTheDocument();

    // Check if MainNav is rendered
    const budgetLink = screen.getByText("Budget");
    const reportsLink = screen.getByText("Reports");
    const accountLink = screen.getByText("Account");
    expect(budgetLink).toBeInTheDocument();
    expect(reportsLink).toBeInTheDocument();
    expect(accountLink).toBeInTheDocument();
  });
});

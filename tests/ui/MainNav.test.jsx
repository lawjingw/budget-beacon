import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainNav from "../../src/ui/MainNav";

describe("MainNav", () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <MainNav />
      </MemoryRouter>
    );
  };

  it("renders correctly", () => {
    const { getByText } = renderComponent();

    expect(getByText("Budget")).toBeInTheDocument();
    expect(getByText("Reports")).toBeInTheDocument();
    expect(getByText("Account")).toBeInTheDocument();
  });

  it("has correct links", () => {
    const { getByText } = renderComponent();

    expect(getByText("Budget").closest("a")).toHaveAttribute("href", "/budget");
    expect(getByText("Reports").closest("a")).toHaveAttribute(
      "href",
      "/reports"
    );
    expect(getByText("Account").closest("a")).toHaveAttribute(
      "href",
      "/account"
    );
  });
});

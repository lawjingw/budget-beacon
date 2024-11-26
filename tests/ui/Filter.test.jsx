import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Filter from "../../src/ui/Filter";
import userEvent from "@testing-library/user-event";

describe("Filter Component", () => {
  const filterField = "status";
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <Filter filterField={filterField} options={options} />
      </BrowserRouter>
    );

    return {
      user: userEvent.setup(),
    };
  };

  it("renders all filter options", () => {
    renderComponent();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("disables the active filter option", async () => {
    const { user } = renderComponent();
    const activeButton = screen.getByText("Active");
    await user.click(activeButton);
    expect(activeButton).toBeDisabled();
  });

  it("updates the URL search params on filter option click", async () => {
    const { user } = renderComponent();
    const activeButton = screen.getByText("Active");
    await user.click(activeButton);
    expect(window.location.search).toContain(`${filterField}=active`);
  });

  it("does not disable non-active filter options", () => {
    renderComponent();
    const allButton = screen.getByText("All");
    const completedButton = screen.getByText("Completed");
    expect(allButton).not.toBeDisabled();
    expect(completedButton).not.toBeDisabled();
  });

  it("does not change URL search params when clicking the already active filter option", async () => {
    const { user } = renderComponent();
    const activeButton = screen.getByText("Active");
    await user.click(activeButton);
    const initialSearch = window.location.search;
    await user.click(activeButton);
    expect(window.location.search).toBe(initialSearch);
  });
});

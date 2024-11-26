import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../src/ui/SortBy";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useSearchParams: vi.fn(),
}));

describe("SortBy Component", () => {
  const setSearchParams = vi.fn();
  const options = [
    { value: "name", label: "Name" },
    { value: "date", label: "Date" },
  ];

  beforeEach(() => {
    useSearchParams.mockReturnValue([new URLSearchParams(), setSearchParams]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with given options", () => {
    render(<SortBy options={options} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("sets search param on change", async () => {
    render(<SortBy options={options} />);

    const select = screen.getByRole("combobox");
    const user = userEvent.setup();
    await user.selectOptions(select, "date");

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    expect(setSearchParams.mock.calls[0][0].get("sortBy")).toBe("date");
  });
});

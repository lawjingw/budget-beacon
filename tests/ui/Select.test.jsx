import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../../src/ui/Select";

describe("Select Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("renders select with options", () => {
    render(<Select value="" options={options} onChange={() => {}} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls onChange when option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select value="" options={options} onChange={handleChange} />);

    const selectElement = screen.getByRole("combobox");
    await user.selectOptions(selectElement, "option2");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything());
  });

  it("displays the correct value", () => {
    render(<Select value="option2" options={options} onChange={() => {}} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement.value).toBe("option2");
  });
});

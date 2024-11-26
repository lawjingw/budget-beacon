import { render, screen } from "@testing-library/react";
import FormRow from "../../src/ui/FormRow";

describe("FormRow Component", () => {
  it("renders the label when provided", () => {
    render(
      <FormRow label="Test Label">
        <input id="test-input" />
      </FormRow>
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <FormRow>
        <input id="test-input" />
      </FormRow>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders error message when errors are provided", () => {
    const errors = { "test-input": { message: "Test Error" } };
    render(
      <FormRow errors={errors}>
        <input id="test-input" />
      </FormRow>
    );
    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("does not render error message when no errors are provided", () => {
    render(
      <FormRow>
        <input id="test-input" />
      </FormRow>
    );
    expect(screen.queryByText("Test Error")).not.toBeInTheDocument();
  });
});

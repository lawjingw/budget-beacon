import { render, screen } from "@testing-library/react";
import Logo from "../../src/ui/Logo";

describe("Logo Component", () => {
  test("renders the logo image", () => {
    render(<Logo />);
    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "./logo.png");
  });

  test("renders the logo text", () => {
    render(<Logo />);
    const logoText = screen.getByText("Budget Beacon");
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveTextContent("Budget Beacon");
  });
});

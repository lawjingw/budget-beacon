import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../../src/ui/Modal";

describe("Modal component", () => {
  const renderComponent = () => {
    const user = userEvent.setup();

    render(
      <Modal>
        <Modal.Open opens="testModal">
          <button>Open Modal</button>
        </Modal.Open>
        <Modal.Window name="testModal">
          <div>Modal Content</div>
        </Modal.Window>
      </Modal>
    );

    return { user };
  };

  it("should render children correctly", () => {
    render(
      <Modal>
        <div>Test Child</div>
      </Modal>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("should open modal when Open component is clicked", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByText("Open Modal"));

    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should close modal when close button is clicked", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByText("Open Modal"));
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should close modal when clicking outside the modal", async () => {
    const { user } = renderComponent();

    await user.click(screen.getByText("Open Modal"));
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    await user.click(document.body);
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should not render modal content if openName does not match", () => {
    render(
      <Modal>
        <Modal.Window name="anotherModal">
          <div>Modal Content</div>
        </Modal.Window>
      </Modal>
    );

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });
});

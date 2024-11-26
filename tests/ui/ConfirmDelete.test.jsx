import { render, screen } from "@testing-library/react";
import ConfirmDelete from "../../src/ui/ConfirmDelete";
import Modal from "../../src/ui/Modal";
import userEvent from "@testing-library/user-event";

describe("ConfirmDelete", () => {
  const renderComponent = () => {
    const onConfirmMock = vi.fn();

    render(
      <Modal>
        <ConfirmDelete resourceName="test resource" onConfirm={onConfirmMock} />
      </Modal>
    );

    return {
      onConfirmMock,
      user: userEvent.setup(),
    };
  };

  it("renders correctly with given resource name", () => {
    renderComponent();

    expect(
      screen.getByText(
        /Are you sure you want to delete this test resource permanently?/
      )
    ).toBeInTheDocument();
  });

  it("calls onConfirm when Delete button is clicked", async () => {
    const { onConfirmMock, user } = renderComponent();

    await user.click(screen.getByText("Delete"));

    expect(onConfirmMock).toHaveBeenCalled();
  });
});

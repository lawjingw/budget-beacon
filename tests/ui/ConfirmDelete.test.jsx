import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmDelete from "../../src/ui/ConfirmDelete";
import Modal from "../../src/ui/Modal";

describe("ConfirmDelete", () => {
  it("renders correctly with given resource name", () => {
    render(
      <Modal>
        <ConfirmDelete resourceName="test resource" onConfirm={vi.fn()} />
      </Modal>
    );

    expect(
      screen.getByText(
        /Are you sure you want to delete this test resource permanently?/
      )
    ).toBeInTheDocument();
  });

  it("calls onConfirm when Delete button is clicked", () => {
    const onConfirmMock = vi.fn();

    render(
      <Modal>
        <ConfirmDelete resourceName="test resource" onConfirm={onConfirmMock} />
      </Modal>
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(onConfirmMock).toHaveBeenCalled();
  });
});

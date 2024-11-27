import styled from "styled-components";
import Button from "./Button";
import { useContext } from "react";
import { ModalContext } from "./ModalContext";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    background-color: var(--color-bg-700);
    color: var(--color-danger-100);
    padding: 1.2rem 1rem;
    border-radius: var(--border-radius-sm);
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resourceName, onConfirm }) {
  const { close: closeModal } = useContext(ModalContext);
  const handleConfirm = () => {
    onConfirm();
    closeModal?.();
  };

  return (
    <StyledConfirmDelete
      role="dialog"
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <p id="confirm-delete-description">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          onClick={() => closeModal?.()}
          aria-label="Cancel deletion"
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          onClick={handleConfirm}
          aria-label="Confirm deletion"
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

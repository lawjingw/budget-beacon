import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditAccountForm from "./EditAccountForm";
import { HiPencil } from "react-icons/hi2";

const StyledEditAccount = styled.div`
  justify-self: end;
`;

function EditAccount() {
  return (
    <StyledEditAccount>
      <Modal>
        <Modal.Open opens="Edit Account">
          <Button>
            <HiPencil />
          </Button>
        </Modal.Open>
        <Modal.Window name="Edit Account">
          <EditAccountForm />
        </Modal.Window>
      </Modal>
    </StyledEditAccount>
  );
}

export default EditAccount;

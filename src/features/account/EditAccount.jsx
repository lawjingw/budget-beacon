import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import EditAccountForm from "./EditAccountForm";
import { HiPencil } from "react-icons/hi2";

function EditAccount() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="edit-account-form">
          <Button>
            <HiPencil />
          </Button>
        </Modal.Open>
        <Modal.Window name="edit-account-form">
          <EditAccountForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditAccount;

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateTransactionForm from "./CreateTransactionForm";

function AddTransaction() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="Add Transaction">
          <Button>Add Transaction</Button>
        </Modal.Open>
        <Modal.Window name="Add Transaction">
          <CreateTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTransaction;

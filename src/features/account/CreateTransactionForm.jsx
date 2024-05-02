import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/ModalContext";
import TransactionForm from "./TransactionForm";
import { useDispatch } from "react-redux";
import { addTransactionThunk } from "./accountSlice";

function CreateTransactionForm() {
  const methods = useForm();
  const { close: closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addTransactionThunk(data));
    closeModal();
  };

  return (
    <TransactionForm
      methods={methods}
      onSubmit={onSubmit}
      closeModal={closeModal}
    />
  );
}

export default CreateTransactionForm;

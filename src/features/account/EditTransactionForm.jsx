import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/ModalContext";
import TransactionForm from "./TransactionForm";
import { useDispatch } from "react-redux";
import { updateTransactionThunk } from "./accountSlice";

function EditTransactionForm({ transaction }) {
  const methods = useForm({ defaultValues: transaction });
  const { close: closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateTransactionThunk(transaction.id, data));
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

export default EditTransactionForm;

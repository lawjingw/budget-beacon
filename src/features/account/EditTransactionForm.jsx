import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/ModalContext";
import TransactionForm from "./TransactionForm";
import { useDispatch } from "react-redux";
import { updateActivity, updateTransaction } from "../budget/budgetSlice";

function EditTransactionForm({ transaction }) {
  const methods = useForm({ defaultValues: transaction });
  const { close: closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      updateTransaction({
        transactionId: transaction.id,
        transaction: data,
      })
    );
    dispatch(updateActivity(data.budgetId));
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

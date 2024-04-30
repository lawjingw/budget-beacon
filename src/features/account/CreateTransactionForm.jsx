import { useContext } from "react";
import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/ModalContext";
import TransactionForm from "./TransactionForm";
import { useDispatch } from "react-redux";
import { createTransaction } from "./accountSlice";
import { changeBudget } from "../budget/changeBudget";

function CreateTransactionForm() {
  const methods = useForm();
  const { close: closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createTransaction(data));
    changeBudget(data, dispatch);
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

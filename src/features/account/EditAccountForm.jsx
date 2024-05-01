import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Form from "../../ui/Form";
import { useContext } from "react";
import { ModalContext } from "../../ui/ModalContext";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { updateAccount } from "./accountSlice";
import { getTodayString } from "../../utils/helpers";
import { addTransaction, updateActivity } from "../budget/budgetSlice";

function EditAccountForm() {
  const { name, currentBalance } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { close: closeModal } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name, currentBalance } });

  const onSubmit = (data) => {
    const balanceDiff = data.currentBalance - currentBalance;

    if (balanceDiff !== 0) {
      const transaction = {
        date: getTodayString(),
        payee: "Manual Balance Adjustment",
        budgetId: "readyToAssign",
        memo: "",
        cashFlow: balanceDiff < 0 ? "outflow" : "inflow",
        amount: Math.abs(balanceDiff),
      };
      dispatch(updateAccount(data));
      dispatch(addTransaction(transaction));
      dispatch(updateActivity(transaction.budgetId));
    }

    closeModal();
  };

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Account Name" errors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Current Balance" errors={errors}>
        <Input
          type="number"
          step="0.01"
          id="currentBalance"
          {...register("currentBalance", {
            required: "This field is required",
            valueAsNumber: true,
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button>Save</Button>
      </FormRow>
    </Form>
  );
}

export default EditAccountForm;

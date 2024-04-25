import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import Form from "../../ui/Form";
import Select from "../../ui/Select";
import { formatCurrency } from "../../utils/helpers";

function TransactionForm({ methods, onSubmit, closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const budget = useSelector((state) => state.budget);
  const categoryOptions = budget.map((categoryBudget) => ({
    value: categoryBudget.id,
    label: `${categoryBudget.category} [${formatCurrency(
      categoryBudget.available
    )}]`,
  }));

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Date" errors={errors}>
        <Input
          type="date"
          id="date"
          {...register("date", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Payee" errors={errors}>
        <Input
          type="text"
          step="0.01"
          id="payee"
          {...register("payee", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Amount" errors={errors}>
        <Input
          type="number"
          step="0.01"
          min="0"
          id="outflow"
          {...register("outflow", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Amount should be at least 0",
            },
          })}
        />
      </FormRow>
      <FormRow label="Category" errors={errors}>
        <Select
          id="category"
          options={categoryOptions}
          {...register("category", {
            required: "This field is required",
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

export default TransactionForm;

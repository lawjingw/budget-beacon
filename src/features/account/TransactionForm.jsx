import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import Form from "../../ui/Form";
import { formatCurrency, getTodayString } from "../../utils/helpers";
import {
  selectCategoryOptions,
  selectReadyToAssign,
} from "../budget/budgetSlice";
import styled from "styled-components";

const Amount = styled.div`
  display: flex;
  gap: 1.2rem;

  & input {
    width: 100%;
  }
`;

const Select = styled.select`
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.2rem;
`;

function TransactionForm({ methods, onSubmit, closeModal }) {
  const todayStr = getTodayString();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const readyToAssign = useSelector(selectReadyToAssign);
  const categoryOptions = useSelector(selectCategoryOptions);

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Date" errors={errors}>
        <Input
          type="date"
          id="date"
          defaultValue={todayStr}
          {...register("date", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Payee" errors={errors}>
        <Input
          type="text"
          id="payee"
          {...register("payee", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Category" errors={errors}>
        <Select
          id="budgetId"
          {...register("budgetId", {
            required: "Select one option",
            onChange: (e) =>
              setValue(
                "cashFlow",
                e.target.value === "readyToAssign" ? "inflow" : "outflow"
              ),
          })}
        >
          <option value="">-- Select Category --</option>
          <option value="readyToAssign">
            Ready to Assign [{formatCurrency(readyToAssign)}]
          </option>
          {categoryOptions.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            );
          })}
        </Select>
      </FormRow>
      <FormRow label="Amount" errors={errors} childId="amount">
        <Amount>
          <Select
            id="cashFlow"
            defaultValue="outflow"
            {...register("cashFlow")}
          >
            <option value="inflow">INFLOW</option>
            <option value="outflow">OUTFLOW</option>
          </Select>
          <Input
            type="number"
            step="0.01"
            min="0"
            id="amount"
            {...register("amount", {
              required: "This field is required",
              min: {
                value: 0,
                message: "Amount should be at least 0",
              },
              valueAsNumber: true,
            })}
          />
        </Amount>
      </FormRow>
      <FormRow label="Memo" errors={errors}>
        <Input type="text" id="memo" {...register("memo")} />
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

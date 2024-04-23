import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useDispatch } from "react-redux";
import { updateTarget } from "./budgetSlice";
import { FaTrash } from "react-icons/fa6";
import styled from "styled-components";

const DangerButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

function TargetForm({ categoryBudget, closeForm }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: categoryBudget });

  const onSubmit = (data) => {
    dispatch(updateTarget({ budgetId: categoryBudget.id, ...data }));
    closeForm();
  };

  const deleteTarget = () => {
    dispatch(updateTarget({ budgetId: categoryBudget.id, target: 0 }));
    closeForm();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Monthly Budget" errors={errors}>
        <Input
          type="number"
          step="0.01"
          min="0"
          id="target"
          autoFocus
          {...register("target", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <DangerButton
          type="button"
          $variation="danger"
          $size="small"
          onClick={deleteTarget}
        >
          <FaTrash />
          Delete
        </DangerButton>
        <Button
          $variation="secondary"
          $size="small"
          type="reset"
          onClick={closeForm}
        >
          Cancel
        </Button>
        <Button $size="small">Save Target</Button>
      </FormRow>
    </Form>
  );
}

export default TargetForm;

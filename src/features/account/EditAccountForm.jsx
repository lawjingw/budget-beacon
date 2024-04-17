import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import { useAccount } from "./AccountContext";
import { useContext } from "react";
import { ModalContext } from "../../ui/ModalContext";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function EditAccountForm() {
  const { account, dispatch } = useAccount();
  const { close: closeModal } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: account });

  const onSubmit = (data) => {
    dispatch({ ...data, type: "update" });
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
            min: {
              value: 0,
              message: "Current balance should be at least 0",
            },
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

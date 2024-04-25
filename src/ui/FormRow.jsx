import { ErrorMessage } from "@hookform/error-message";
import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.6rem;

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    flex-direction: row;
    justify-content: end;
    padding-top: 2.2rem;
    flex-wrap: wrap;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-danger-100);
`;

function FormRow({ label, errors, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {errors && (
        <ErrorMessage
          errors={errors}
          name={children.props.id}
          render={({ message }) => <Error>{message}</Error>}
        />
      )}
    </StyledFormRow>
  );
}

export default FormRow;

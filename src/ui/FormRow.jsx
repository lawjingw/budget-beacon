import { ErrorMessage } from "@hookform/error-message";
import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.6rem;

  &:has(button):last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    flex-direction: row;
    justify-content: end;
    padding-top: 2.2rem;
    flex-wrap: wrap;
  }

  &:has(input[type="date"]) {
    position: relative;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-danger-100);
`;

function FormRow({ label, errors, childId = null, children }) {
  const id = childId ? childId : children.props?.id;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {errors && (
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ message }) => (
            <Error role="alert" aria-live="assertive">
              {message}
            </Error>
          )}
        />
      )}
    </StyledFormRow>
  );
}

export default FormRow;

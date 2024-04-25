import styled from "styled-components";

const StyledSelect = styled.select`
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.2rem;
`;

function Select({ options, ...props }) {
  return (
    <StyledSelect {...props}>
      <option value="">-- Select a category --</option>
      {options.map((option) => {
        return (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        );
      })}
    </StyledSelect>
  );
}

export default Select;

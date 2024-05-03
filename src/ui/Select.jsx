import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
`;

function Select({ value, options, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;

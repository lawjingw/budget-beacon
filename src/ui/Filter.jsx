import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-bg-300);
  background-color: var(--color-bg-100);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-bg-100);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-primary-100);
      color: var(--color-text-100);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-primary-100);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentOption = searchParams.get(filterField);

  const handleClick = (value) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };

  return (
    <StyledFilter role="group" aria-label={`Filter by ${filterField}`}>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          $active={currentOption === option.value}
          disabled={currentOption === option.value}
          key={option.value}
          aria-pressed={currentOption === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

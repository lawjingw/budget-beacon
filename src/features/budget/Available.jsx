import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const stateColors = {
  unavailable: css`
    opacity: 0.8;
    background-color: var(--color-bg-300);
  `,
  available: css`
    color: var(--color-bg-100);
    background-color: var(--color-accent-100);
  `,
  targetUnmet: css`
    color: var(--color-bg-100);
    background-color: var(--color-primary-300);
  `,
  targetAchieve: css`
    color: var(--color-bg-100);
    background-color: var(--color-accent-100);
  `,
  overspending: css`
    color: var(--color-danger-200);
    background-color: var(--color-danger-100);
  `,
};

const StyledAvailable = styled.div`
  padding: 0 1rem;
  text-align: center;
  border-radius: 10px;
  ${(props) => stateColors[props.$state]};
`;

function Available({ assigned, activity, target }) {
  const available = assigned + activity;
  const budgetState = calBudgetState(assigned, available, target);

  return (
    <div>
      <StyledAvailable $state={budgetState}>
        {formatCurrency(available)}
      </StyledAvailable>
    </div>
  );
}

function calBudgetState(assigned, available, target) {
  if (available < 0) {
    return "overspending";
  } else if (target > 0 && assigned < target) {
    return "targetUnmet";
  } else if (target > 0 && assigned >= target) {
    return "targetAchieve";
  } else if (available > 0) {
    return "available";
  } else {
    return "unavailable";
  }
}

export default Available;

import styled from "styled-components";
import Spending from "./Spending";

const StyledCategorySpending = styled.div`
  background-color: var(--color-bg-400);
  padding: 1.2rem 1.8rem;
  border-radius: var(--border-radius-sm);

  & header {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-text-100);
  }
`;

const groups = {
  bills: ["1", "2", "7", "9", "11", "12", "13"],
  needs: ["3", "6", "14", "15"],
  wants: ["4", "5", "8", "10"],
};

function CategorySpending({ group, spendingSummary }) {
  const spendingByGroup = spendingSummary.filter((item) =>
    groups[group.toLowerCase()].includes(item.budgetId)
  );

  return (
    <StyledCategorySpending>
      <header>{group}</header>
      {spendingByGroup.map((spendingByCategory) => {
        return (
          <Spending
            spendingByCategory={spendingByCategory}
            key={spendingByCategory.budgetId}
          />
        );
      })}
    </StyledCategorySpending>
  );
}

export default CategorySpending;

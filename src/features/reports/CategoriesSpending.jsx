import styled from "styled-components";
import { floatify } from "../../utils/helpers";
import CategorySpending from "./CategorySpending";

const StyledCategoriesSpending = styled.div`
  padding: 2rem 0;
  display: flex;
  color: var(--color-text-100);
  flex-direction: column;
  row-gap: 1rem;
`;

function CategoriesSpending({ transactions }) {
  const spendingSummary = transactions
    .reduce((acc, { budgetId, cashFlow, amount }) => {
      const existingEntry = acc.find((entry) => entry.budgetId === budgetId);
      if (existingEntry) {
        existingEntry.spending =
          cashFlow === "outflow"
            ? floatify(existingEntry.spending + amount)
            : floatify(existingEntry.spending - amount);
      } else if (budgetId !== "readyToAssign") {
        acc.push({ budgetId, spending: amount });
      }
      return acc;
    }, [])
    .filter((category) => category.spending !== 0);
  return (
    <StyledCategoriesSpending>
      <CategorySpending group="Bills" spendingSummary={spendingSummary} />
      <CategorySpending group="Needs" spendingSummary={spendingSummary} />
      <CategorySpending group="Wants" spendingSummary={spendingSummary} />
    </StyledCategoriesSpending>
  );
}

export default CategoriesSpending;

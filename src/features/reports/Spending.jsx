import { useSelector } from "react-redux";
import { selectCategoryById } from "../budget/budgetSlice";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledSpending = styled.div`
  padding-top: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

function Spending({ spendingByCategory }) {
  const category = useSelector((state) =>
    selectCategoryById(state, spendingByCategory.budgetId)
  );

  return (
    <StyledSpending>
      <div>{category}</div>
      <div>{formatCurrency(spendingByCategory.spending)}</div>
    </StyledSpending>
  );
}

export default Spending;

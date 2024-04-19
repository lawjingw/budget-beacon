import { useSelector } from "react-redux";
import { selectTotalAssigned } from "./budgetSlice";
import { selectCurrentBalance } from "../account/accountSlice";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledReadyToAssign = styled.div`
  padding: 1rem 1.8rem;
  background-color: var(--color-accent-100);
  border-radius: var(--border-radius-md);
  color: var(--color-bg-200);
  & p {
    font-size: 1.4rem;
  }
`;

function ReadyToAssign() {
  const totalAssigned = useSelector(selectTotalAssigned);
  const currentBalance = useSelector(selectCurrentBalance);
  const readyToAssign = currentBalance - totalAssigned;

  return (
    <StyledReadyToAssign>
      <Heading as="h2">{formatCurrency(readyToAssign)}</Heading>
      <p>Ready to Assign</p>
    </StyledReadyToAssign>
  );
}

export default ReadyToAssign;

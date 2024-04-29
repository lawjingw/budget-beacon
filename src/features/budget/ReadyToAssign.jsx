import { useSelector } from "react-redux";
import { selectReadyToAssign } from "./budgetSlice";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledReadyToAssign = styled.div`
  padding: 1rem 1.8rem;
  background-color: var(--color-bg-400);
  border-radius: var(--border-radius-md);
  color: var(--color-accent-100);
  justify-self: start;

  & p {
    font-size: 1.4rem;
  }
`;

function ReadyToAssign() {
  const readyToAssign = useSelector(selectReadyToAssign);

  return (
    <StyledReadyToAssign>
      <Heading as="h2">{formatCurrency(readyToAssign)}</Heading>
      <p>Ready to Assign</p>
    </StyledReadyToAssign>
  );
}

export default ReadyToAssign;

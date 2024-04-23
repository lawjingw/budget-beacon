import styled from "styled-components";
import CreateTarget from "./CreateTarget";
import EditTarget from "./EditTarget";

const StyledTarget = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-bg-100);
  border-radius: 7px;
  padding: 1rem 2rem;
`;

const TargetHeading = styled.header`
  font-size: 1.4rem;
  font-weight: 600;
  padding: 1.2rem 0;
`;

function Target({ categoryBudget }) {
  return (
    <StyledTarget>
      <TargetHeading>Target</TargetHeading>
      {categoryBudget.target > 0 ? (
        <EditTarget />
      ) : (
        <CreateTarget categoryBudget={categoryBudget} />
      )}
    </StyledTarget>
  );
}

export default Target;

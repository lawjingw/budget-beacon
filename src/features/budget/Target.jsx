import styled from "styled-components";
import CreateTarget from "./CreateTarget";

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

function Target({ category }) {
  return (
    <StyledTarget>
      <TargetHeading>Target</TargetHeading>
      <CreateTarget category={category} />
    </StyledTarget>
  );
}

export default Target;

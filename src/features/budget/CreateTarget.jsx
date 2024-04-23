import styled from "styled-components";
import Button from "../../ui/Button";

const TargetView = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p:first-of-type {
    font-weight: 600;
  }
`;

function CreateTarget({ categoryBudget, handleShowForm }) {
  return (
    <TargetView>
      <p>How much do you need for {categoryBudget.category}?</p>
      <p>
        When you create a target, we’ll let you know how much money to set aside
        to stay on track over time.
      </p>
      <Button $size="small" onClick={() => handleShowForm(true)}>
        Create Target
      </Button>
    </TargetView>
  );
}

export default CreateTarget;

import styled from "styled-components";
import CreateTarget from "./CreateTarget";
import EditTarget from "./EditTarget";
import { useState } from "react";
import TargetForm from "./TargetForm";

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
  const [showForm, setShowForm] = useState(false);

  return (
    <StyledTarget>
      <TargetHeading>Target</TargetHeading>
      {showForm && (
        <TargetForm
          categoryBudget={categoryBudget}
          closeForm={() => setShowForm(false)}
        />
      )}
      {categoryBudget.target > 0 && !showForm && (
        <EditTarget
          categoryBudget={categoryBudget}
          handleShowForm={setShowForm}
        />
      )}
      {categoryBudget.target === 0 && !showForm && (
        <CreateTarget
          categoryBudget={categoryBudget}
          handleShowForm={setShowForm}
        />
      )}
    </StyledTarget>
  );
}

export default Target;

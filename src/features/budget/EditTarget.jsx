import styled from "styled-components";
import Button from "../../ui/Button";
import TargetChart from "./TargetChart";
import { formatCurrency } from "../../utils/helpers";

const TargetView = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & > p {
    font-weight: 600;
  }
`;

const TargetInfo = styled.div`
  text-align: center;
  background-color: ${(props) =>
    props.$isTargetMeeted ? "var(--color-bg-400)" : "var(--color-bg-600)"};
  padding: 1.2rem 1.8rem;
  border-radius: var(--border-radius-sm);
`;

const TargetContent = styled.div`
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

function EditTarget({ categoryBudget, handleShowForm }) {
  const isTargetMeeted = categoryBudget.assigned >= categoryBudget.target;
  const toGo = isTargetMeeted
    ? 0
    : categoryBudget.target - categoryBudget.assigned;

  const data = [
    { name: "funded", value: categoryBudget.assigned },
    { name: "toGo", value: toGo },
  ];

  return (
    <TargetView>
      <p>Refill Up to {formatCurrency(categoryBudget.target)} Each Month</p>
      <TargetChart data={data} />
      <TargetInfo $isTargetMeeted={isTargetMeeted}>
        {categoryBudget.assigned === 0 && (
          <p>
            Assign {formatCurrency(categoryBudget.target)} to meet your target
          </p>
        )}
        {categoryBudget.assigned > 0 && !isTargetMeeted && (
          <p>Assign {formatCurrency(toGo)} more to meet your target</p>
        )}
        {isTargetMeeted && <p>You&apos;ve met your target!</p>}
      </TargetInfo>
      <TargetContent>
        <div>
          <p>Needed</p>
          <p>{formatCurrency(categoryBudget.target)}</p>
        </div>
        <div>
          <p>Funded</p>
          <p>{formatCurrency(categoryBudget.assigned)}</p>
        </div>
        <div>
          <p>To Go</p>
          <p>{formatCurrency(toGo)}</p>
        </div>
      </TargetContent>
      <Button $size="small" onClick={() => handleShowForm(true)}>
        Edit Target
      </Button>
    </TargetView>
  );
}

export default EditTarget;

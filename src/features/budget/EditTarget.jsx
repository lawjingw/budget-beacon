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

const TargetContent = styled.div`
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

function EditTarget({ categoryBudget, handleShowForm }) {
  const toGo =
    categoryBudget.target - categoryBudget.assigned < 0
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

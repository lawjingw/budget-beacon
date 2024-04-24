import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { assignBudget } from "./budgetSlice";
import TableSpace from "../../ui/TableSpace";
import Available from "./Available";

const Category = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  justify-self: left;
`;

const AssignedNumber = styled.input`
  background-color: inherit;
  border-radius: var(--border-radius-sm);
  border: none;
  text-align: right;
`;

const AssignedText = styled.input`
  background-color: inherit;
  border-radius: var(--border-radius-sm);
  border: none;
  text-align: right;

  .row:hover & {
    outline: 2px solid var(--color-primary-200);
    outline-offset: -1px;
  }
`;

function BudgetRow({ budget }) {
  const { id, category, assigned, activity } = budget;
  const dispatch = useDispatch();

  const handleUpdateAssigned = (money, setIsEditing) => {
    dispatch(assignBudget({ budgetId: id, assigned: money }));
    setIsEditing(false);
  };

  return (
    <TableSpace.Row
      name={id}
      renderItem={(isEditing, setIsEditing) => (
        <>
          <Category>{category}</Category>
          {isEditing ? (
            <AssignedNumber
              type="number"
              step="0.01"
              min="0"
              defaultValue={assigned}
              onBlur={(e) => handleUpdateAssigned(e.target.value, setIsEditing)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                handleUpdateAssigned(e.target.value, setIsEditing)
              }
              autoFocus
            />
          ) : (
            <AssignedText
              type="text"
              value={formatCurrency(assigned)}
              readOnly
            />
          )}
          <div>{formatCurrency(activity)}</div>
          <Available budget={budget} />
        </>
      )}
    ></TableSpace.Row>
  );
}

export default BudgetRow;

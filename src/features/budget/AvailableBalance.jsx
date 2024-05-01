import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectActivityById,
  selectTotalActivity,
  selectTotalAssigned,
} from "./budgetSlice";
import Available from "./Available";
import { formatCurrency } from "../../utils/helpers";

const BalanceContent = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-bg-100);
  border-radius: 7px;
  padding: 1rem 2rem;
`;

const AvailableHeading = styled.div`
  padding: 1.2rem 0;
  display: flex;
  justify-content: space-between;

  & header {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const AvailableContent = styled.div`
  padding: 1.2rem 0;
  & div {
    display: flex;
    justify-content: space-between;
  }
`;

function AvailableBalance({ categoryBudget }) {
  const totalAssigned = useSelector(selectTotalAssigned);
  const activity = useSelector(
    categoryBudget
      ? (state) => selectActivityById(state, categoryBudget.id)
      : selectTotalActivity
  );
  const totalAvailable = totalAssigned + activity;

  return (
    <BalanceContent>
      <AvailableHeading>
        <header>Available Balance</header>
        {categoryBudget ? (
          <Available
            assigned={categoryBudget.assigned}
            activity={activity}
            target={categoryBudget.target}
          />
        ) : (
          <p>{formatCurrency(totalAvailable)}</p>
        )}
      </AvailableHeading>
      <AvailableContent>
        <div>
          <p>Assigned This Month</p>
          <p>
            {categoryBudget
              ? formatCurrency(categoryBudget.assigned)
              : formatCurrency(totalAssigned)}
          </p>
        </div>
        <div>
          <p>Activity</p>
          <p>{formatCurrency(activity)}</p>
        </div>
      </AvailableContent>
    </BalanceContent>
  );
}

export default AvailableBalance;

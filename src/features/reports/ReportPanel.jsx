import styled from "styled-components";
import Heading from "../../ui/Heading";
import { floatify, formatCurrency } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTransactions } from "../account/accountSlice";
import { differenceInMonths, format } from "date-fns";

const Panel = styled.div`
  border: 1px solid var(--color-bg-300);
  font-size: 1.4rem;
  background-color: var(--color-bg-200);
  border-radius: 7px;
  padding: 2rem 2rem;
`;

const Duration = styled.div`
  display: flex;
  color: var(--color-text-100);
  flex-direction: column;
  align-items: center;
  row-gap: 0.4rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-bg-300);
`;

const Spending = styled.div`
  display: flex;
  color: var(--color-accent-100);
  flex-direction: column;
  align-items: center;
  row-gap: 0.4rem;
  padding: 2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-bg-300);
  }

  & header {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--color-text-100);
  }

  & p {
    color: var(--color-text-100);
  }
`;

function calAverageSpending(totalSpending, firstDate, lastDate) {
  const difMonths = differenceInMonths(new Date(lastDate), new Date(firstDate));

  return formatCurrency(totalSpending / (difMonths + 1));
}

function calDuration(firstDate, lastDate) {
  const difMonths = differenceInMonths(new Date(lastDate), new Date(firstDate));

  if (difMonths > 0)
    return `${format(new Date(firstDate), "MMM yyyy")} - ${format(
      new Date(lastDate),
      "MMM yyyy"
    )}`;
  return format(new Date(firstDate), "MMM yyyy");
}

function ReportPanel() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("last");
  const transactions = useSelector((state) =>
    selectTransactions(state, filter)
  );
  const lastDate = transactions.at(0).date;
  const firstDate = transactions.at(-1).date;

  const totalSpending = transactions.reduce(
    (sum, transaction) =>
      transaction.budgetId === "readyToAssign"
        ? sum
        : transaction.cashFlow === "outflow"
        ? floatify(sum + transaction.amount)
        : floatify(sum - transaction.amount),
    0
  );

  const averageSpending = calAverageSpending(
    totalSpending,
    firstDate,
    lastDate
  );

  const durationMonths = calDuration(firstDate, lastDate);

  return (
    <Panel>
      <Duration>
        <Heading as="h2">{durationMonths}</Heading>
        <p>All categories included</p>
      </Duration>
      <Spending>
        <header>TOTAL SPENDING</header>
        <Heading as="h2">{formatCurrency(totalSpending)}</Heading>
        <p>For this time period</p>
      </Spending>
      <Spending>
        <header>AVERAGE SPENDING</header>
        <Heading as="h2">{averageSpending}</Heading>
        <p>Per month</p>
      </Spending>
    </Panel>
  );
}

export default ReportPanel;

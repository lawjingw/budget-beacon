import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useSelector } from "react-redux";
import { selectTransactions } from "../account/accountSlice";
import { floatify, formatCurrency } from "../../utils/helpers";
import { format } from "date-fns";

const ChartBox = styled.div`
  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`;

const groups = {
  bills: ["1", "2", "7", "9", "11", "12", "13"],
  needs: ["3", "6", "14", "15"],
  wants: ["4", "5", "8", "10"],
};

function countAmount(cashFlow, oldAmount, newAmount) {
  return cashFlow === "outflow"
    ? floatify(oldAmount + newAmount)
    : floatify(oldAmount - newAmount);
}

function calculateGroupSpending(transactions) {
  transactions = transactions.filter(
    (transaction) => transaction.budgetId !== "readyToAssign"
  );

  // Create a map to hold monthly spending totals for each group
  const spendingMap = new Map();

  // Process each transaction
  transactions.forEach((transaction) => {
    // Parse the date using date-fns and format it as 'MM/YY'
    const monthYearKey = format(new Date(transaction.date), "MM/yy");

    // Initialize the spending object for the month if it doesn't exist
    if (!spendingMap.has(monthYearKey)) {
      spendingMap.set(monthYearKey, { bills: 0, needs: 0, wants: 0 });
    }

    // Get the current spending object for the month
    const currentSpending = spendingMap.get(monthYearKey);

    // Determine the group of the current transaction
    const group = Object.keys(groups).find((group) =>
      groups[group].includes(transaction.budgetId)
    );

    // Update the spending amount for the group
    if (group) {
      currentSpending[group] = countAmount(
        transaction.cashFlow,
        currentSpending[group],
        transaction.amount
      );
    }

    // Update the map with the new spending amount
    spendingMap.set(monthYearKey, currentSpending);
  });

  // Convert the map to an array of objects
  const data = Array.from(spendingMap, ([name, spending]) => ({
    name,
    ...spending,
  }));

  return data;
}
function SpendingTrendChart() {
  const transactions = useSelector((state) => selectTransactions(state));
  const data = calculateGroupSpending(transactions);

  return (
    <ChartBox>
      <Heading as="h2">Spending Trends</Heading>
      <ResponsiveContainer width="100%" height={440}>
        <BarChart data={data} margin={{ left: 22 }}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend iconSize={15} iconType="square" />
          <Bar
            name="Bills"
            dataKey="bills"
            stackId="a"
            fill="var(--color-primary-100)"
          />
          <Bar
            name="Wants"
            dataKey="wants"
            stackId="a"
            fill="var(--color-primary-200)"
          />
          <Bar
            name="Needs"
            dataKey="needs"
            stackId="a"
            fill="var(--color-primary-300)"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default SpendingTrendChart;

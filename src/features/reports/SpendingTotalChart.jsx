import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSelector } from "react-redux";
import { selectTransactions } from "../account/accountSlice";
import { floatify, formatCurrency } from "../../utils/helpers";

const ChartBox = styled.div`
  padding: 2.4rem 3.2rem;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`;

const startData = [
  {
    group: "Bills",
    value: 0,
    color: "var(--color-primary-100)",
  },
  {
    group: "Wants",
    value: 0,
    color: "var(--color-primary-200)",
  },
  {
    group: "Needs",
    value: 0,
    color: "var(--color-primary-300)",
  },
];

function prepareData(startData, transactions) {
  const calSpending = (arr, field, cashFlow, amount) =>
    arr.map((item) => {
      if (item.group === field)
        return {
          ...item,
          value:
            cashFlow === "outflow"
              ? floatify(item.value + amount)
              : floatify(item.value - amount),
        };
      else return item;
    });

  const data = transactions
    .reduce((arr, cur) => {
      if (["1", "2", "7", "9", "11", "12", "13"].includes(cur.budgetId))
        return calSpending(arr, "Bills", cur.cashFlow, cur.amount);
      if (["3", "6", "14", "15"].includes(cur.budgetId))
        return calSpending(arr, "Needs", cur.cashFlow, cur.amount);
      if (["4", "5", "8", "10"].includes(cur.budgetId))
        return calSpending(arr, "Wants", cur.cashFlow, cur.amount);
      return arr;
    }, startData)
    .filter((item) => item.value > 0);

  return data;
}

function SpendingTotalChart() {
  const transactions = useSelector((state) => selectTransactions(state));
  const data = prepareData(startData, transactions);
  const totalSpending = data.reduce((arr, cur) => arr + cur.value, 0);

  return (
    <ChartBox>
      <Heading as="h2">Spending Totals</Heading>
      <ResponsiveContainer width="100%" height={440}>
        <PieChart>
          <text
            x="35%"
            y="48%"
            textAnchor="middle"
            fill="var(--color-text-100)"
            fontSize="1.6rem"
          >
            All Categories
          </text>
          <text
            x="35%"
            y="54%"
            textAnchor="middle"
            fill="var(--color-text-100)"
            fontSize="1.6rem"
          >
            {formatCurrency(totalSpending)}
          </text>
          <Pie
            data={data}
            nameKey="group"
            dataKey="value"
            innerRadius={115}
            outerRadius={185}
            cx="50%"
            cy="50%"
            animationBegin="100"
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.group} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default SpendingTotalChart;

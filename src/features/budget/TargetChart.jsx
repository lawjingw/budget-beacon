import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
];

const colors = ["var(--color-accent-200)", "var(--color-accent-100)"];

function TargetChart() {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          innerRadius={30}
          outerRadius={40}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TargetChart;

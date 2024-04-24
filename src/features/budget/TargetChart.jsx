import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { FaCheck } from "react-icons/fa6";

function TargetChart({ data }) {
  const percentage = data.reduce((acc, cur) =>
    Math.floor((acc.value / (acc.value + cur.value)) * 100)
  );

  return (
    <ResponsiveContainer width="100%" height={100}>
      <PieChart>
        {percentage >= 100 ? (
          <g>
            <FaCheck
              size={34}
              x="44%"
              y="34%"
              color="var(--color-accent-100)"
            />
          </g>
        ) : (
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            fill="var(--color-primary-300)"
            fontWeight="700"
            fontSize="1.8rem"
          >
            {percentage}%
          </text>
        )}

        <Pie
          dataKey="value"
          data={data}
          innerRadius={32}
          outerRadius={42}
          stroke="none"
          animationBegin="100"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                percentage >= 100
                  ? "var(--color-accent-100)"
                  : "var(--color-primary-300)"
              }
              fillOpacity={index === 1 && 0.1}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TargetChart;

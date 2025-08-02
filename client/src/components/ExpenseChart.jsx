// src/components/ExpenseChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define some colors for the chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

function ExpenseChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No data for this month to display in chart.</p>;
  }

  return (
    // ResponsiveContainer makes the chart fit its parent container's size
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%" // center x-coordinate
          cy="50%" // center y-coordinate
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value" // The key in our data object that holds the value
          nameKey="name"  // The key that holds the name for the label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;
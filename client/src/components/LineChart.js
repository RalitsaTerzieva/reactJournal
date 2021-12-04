import {
  LineChart as LC,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
export const LineChart = ({ data, dataKey, tooltipFormatter }) => {
  return <ResponsiveContainer width="100%" height="100%">
    <LC data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip formatter={tooltipFormatter} />
      <Legend />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke="#BAE3D1"
        strokeWidth={2}
        activeDot={{ r: 8 }}
        dot={true}
        isAnimationActive={false}
      />
    </LC>
  </ResponsiveContainer>
}

export default LineChart;
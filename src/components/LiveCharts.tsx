import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import type { HistoryPoint } from "@/hooks/useSimulatedData";

export default function LiveCharts({ history }: { history: HistoryPoint[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="glass-card p-6">
        <h3 className="font-display text-sm text-primary mb-4 neon-text-blue">Temperature vs Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 30% 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 20% 65%)" }} />
            <YAxis domain={[36, 39]} tick={{ fontSize: 10, fill: "hsl(215 20% 65%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(260 40% 10% / 0.9)",
                border: "1px solid hsl(260 30% 18%)",
                borderRadius: "8px",
                color: "hsl(210 40% 95%)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#06B6D4"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              style={{ filter: "drop-shadow(0 0 4px #06B6D4)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display text-sm text-primary mb-4 neon-text-blue">Risk Score vs Time</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(260 30% 18%)" />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215 20% 65%)" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215 20% 65%)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(260 40% 10% / 0.9)",
                border: "1px solid hsl(260 30% 18%)",
                borderRadius: "8px",
                color: "hsl(210 40% 95%)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="riskScore"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
              isAnimationActive
              style={{ filter: "drop-shadow(0 0 4px #4F46E5)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

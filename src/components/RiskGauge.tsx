import { motion } from "framer-motion";

function getGaugeColor(score: number) {
  if (score < 30) return "hsl(142 71% 45%)";
  if (score < 65) return "hsl(38 92% 50%)";
  return "hsl(0 84% 60%)";
}

export default function RiskGauge({ riskScore }: { riskScore: number }) {
  const color = getGaugeColor(riskScore);
  const radius = 60;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (riskScore / 100) * circumference;

  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <h3 className="font-display text-sm text-primary mb-4 neon-text-blue">AI Risk Meter</h3>
      <div className="relative w-40 h-24">
        <svg className="w-full h-full" viewBox="0 0 140 80">
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke="hsl(260 30% 18%)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.path
            d="M 10 70 A 60 60 0 0 1 130 70"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <motion.span
            className="text-2xl font-display font-bold"
            style={{ color }}
            key={riskScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {riskScore}
          </motion.span>
        </div>
      </div>
      {riskScore >= 65 && (
        <motion.div
          className="mt-2 w-3 h-3 rounded-full bg-destructive"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
}

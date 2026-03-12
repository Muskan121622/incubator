import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SensorData } from "@/hooks/useSimulatedData";

const levelConfig = {
  SAFE: { color: "bg-accent text-accent-foreground", glow: "neon-glow-green", textColor: "text-accent" },
  WARNING: { color: "bg-warning text-warning-foreground", glow: "", textColor: "text-warning" },
  CRITICAL: { color: "bg-destructive text-destructive-foreground", glow: "neon-glow-red", textColor: "text-destructive" },
};

export default function RiskCard({ riskScore, riskLevel }: Pick<SensorData, "riskScore" | "riskLevel">) {
  const cfg = levelConfig[riskLevel];

  return (
    <div className={`glass-card-hover p-6 ${cfg.glow} ${riskLevel === "CRITICAL" ? "animate-blink-alert" : ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <Brain className={`w-5 h-5 ${cfg.textColor}`} />
        <span className="text-sm text-muted-foreground font-body">AI Risk Prediction</span>
      </div>
      <motion.div
        className={`text-5xl font-display font-bold ${cfg.textColor} mb-3`}
        key={riskScore}
        initial={{ scale: 1.15, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {riskScore}
      </motion.div>
      <Badge className={cfg.color}>{riskLevel}</Badge>
    </div>
  );
}

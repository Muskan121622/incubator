import { motion } from "framer-motion";
import { Thermometer } from "lucide-react";

function getTempColor(temp: number) {
  if (temp < 37.3) return { bar: "bg-accent", text: "text-accent", glow: "neon-glow-green" };
  if (temp < 37.8) return { bar: "bg-warning", text: "text-warning", glow: "" };
  return { bar: "bg-destructive", text: "text-destructive", glow: "neon-glow-red" };
}

export default function TemperatureCard({ temperature }: { temperature: number }) {
  const c = getTempColor(temperature);
  const pct = Math.min(100, Math.max(0, ((temperature - 35) / 4) * 100));

  return (
    <div className={`glass-card-hover p-6 ${c.glow}`}>
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className={`w-5 h-5 ${c.text}`} />
        <span className="text-sm text-muted-foreground font-body">Temperature</span>
      </div>
      <motion.div
        className={`text-4xl font-display font-bold ${c.text} mb-4`}
        key={temperature}
        initial={{ scale: 1.1, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {temperature}°C
      </motion.div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${c.bar}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1 font-body">
        <span>35°C</span>
        <span>39°C</span>
      </div>
    </div>
  );
}

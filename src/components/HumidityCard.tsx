import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

export default function HumidityCard({ humidity }: { humidity: number }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (humidity / 100) * circumference;

  return (
    <div className="glass-card-hover p-6">
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-secondary" />
        <span className="text-sm text-muted-foreground font-body">Humidity</span>
      </div>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r={radius} fill="none"
            stroke="hsl(var(--neon-cyan))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 6px hsl(187 92% 43% / 0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-2xl font-display font-bold text-secondary"
            key={humidity}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {humidity}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}

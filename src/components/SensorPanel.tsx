import { motion } from "framer-motion";
import { Heart, Wind, Thermometer, Droplets } from "lucide-react";
import type { SensorData } from "@/hooks/useSimulatedData";

function SensorItem({ icon, label, value, unit }: { icon: React.ReactNode; label: string; value: number; unit: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      {icon}
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-body">{label}</p>
        <motion.p
          className="text-lg font-display font-semibold text-foreground"
          key={value}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{unit}
        </motion.p>
      </div>
    </div>
  );
}

export default function SensorPanel({ data }: { data: SensorData }) {
  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-sm text-primary mb-3 neon-text-blue">Sensor Readings</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SensorItem icon={<Thermometer className="w-4 h-4 text-secondary" />} label="Temperature" value={data.temperature} unit="°C" />
        <SensorItem icon={<Droplets className="w-4 h-4 text-secondary" />} label="Humidity" value={data.humidity} unit="%" />
        <SensorItem icon={<Heart className="w-4 h-4 text-destructive" />} label="Heart Rate" value={data.heartRate} unit=" bpm" />
        <SensorItem icon={<Wind className="w-4 h-4 text-accent" />} label="SpO₂" value={data.oxygenSat} unit="%" />
      </div>
    </div>
  );
}

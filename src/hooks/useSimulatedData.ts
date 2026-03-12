import { useState, useEffect, useCallback, useRef } from "react";

export interface SensorData {
  temperature: number;
  humidity: number;
  riskScore: number;
  riskLevel: "SAFE" | "WARNING" | "CRITICAL";
  heartRate: number;
  oxygenSat: number;
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: "info" | "warning" | "critical";
  message: string;
  timestamp: Date;
}

export interface HistoryPoint {
  time: string;
  temperature: number;
  riskScore: number;
}

function calculateRisk(temp: number): { score: number; level: SensorData["riskLevel"] } {
  const drift = Math.abs(temp - 37.0);
  const score = Math.min(100, Math.round(drift * 60 + Math.random() * 10));
  const level: SensorData["riskLevel"] = score < 30 ? "SAFE" : score < 65 ? "WARNING" : "CRITICAL";
  return { score, level };
}

export function useSimulatedData() {
  const [data, setData] = useState<SensorData>({
    temperature: 37.0,
    humidity: 55,
    riskScore: 12,
    riskLevel: "SAFE",
    heartRate: 140,
    oxygenSat: 98,
    timestamp: new Date(),
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: "1", type: "info", message: "System initialized", timestamp: new Date() },
  ]);

  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const tickRef = useRef(0);

  const tick = useCallback(() => {
    const temp = 36.5 + Math.random() * 2;
    const humidity = 50 + Math.random() * 15;
    const { score, level } = calculateRisk(temp);
    const heartRate = 130 + Math.random() * 20;
    const oxygenSat = 95 + Math.random() * 4;
    const now = new Date();

    const newData: SensorData = {
      temperature: Math.round(temp * 10) / 10,
      humidity: Math.round(humidity),
      riskScore: score,
      riskLevel: level,
      heartRate: Math.round(heartRate),
      oxygenSat: Math.round(oxygenSat * 10) / 10,
      timestamp: now,
    };

    setData(newData);

    const timeLabel = now.toLocaleTimeString("en-US", { hour12: false, minute: "2-digit", second: "2-digit" });
    setHistory((prev) => [...prev.slice(-29), { time: timeLabel, temperature: newData.temperature, riskScore: score }]);

    // Random alert generation
    if (level === "CRITICAL" && Math.random() > 0.5) {
      setAlerts((prev) => [
        { id: Date.now().toString(), type: "critical", message: `High temperature: ${newData.temperature}°C`, timestamp: now },
        ...prev.slice(0, 9),
      ]);
    } else if (level === "WARNING" && Math.random() > 0.7) {
      setAlerts((prev) => [
        { id: Date.now().toString(), type: "warning", message: `Temperature drifting: ${newData.temperature}°C`, timestamp: now },
        ...prev.slice(0, 9),
      ]);
    }

    tickRef.current++;
  }, []);

  useEffect(() => {
    // Initial data points
    for (let i = 0; i < 10; i++) tick();
    const interval = setInterval(tick, 2000);
    return () => clearInterval(interval);
  }, [tick]);

  return { data, alerts, history };
}

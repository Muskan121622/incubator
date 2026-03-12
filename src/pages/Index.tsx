import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";
import TopNav from "@/components/TopNav";
import TemperatureCard from "@/components/TemperatureCard";
import HumidityCard from "@/components/HumidityCard";
import RiskCard from "@/components/RiskCard";
import AlertCard from "@/components/AlertCard";
import LiveCharts from "@/components/LiveCharts";
import SensorPanel from "@/components/SensorPanel";
import RiskGauge from "@/components/RiskGauge";
import IncubatorVisualization from "@/components/IncubatorVisualization";
import { useSimulatedData } from "@/hooks/useSimulatedData";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const { data, alerts, history } = useSimulatedData();
  const onComplete = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={onComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          className="relative z-10 p-4 md:p-6 max-w-[1600px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <TopNav />

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <TemperatureCard temperature={data.temperature} />
            <HumidityCard humidity={data.humidity} />
            <RiskCard riskScore={data.riskScore} riskLevel={data.riskLevel} />
            <AlertCard alerts={alerts} />
          </div>

          {/* Charts */}
          <div className="mb-4">
            <LiveCharts history={history} />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SensorPanel data={data} />
            <RiskGauge riskScore={data.riskScore} />
            <IncubatorVisualization riskScore={data.riskScore} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

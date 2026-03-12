import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, AlertOctagon } from "lucide-react";
import type { Alert } from "@/hooks/useSimulatedData";
import { ScrollArea } from "@/components/ui/scroll-area";

const icons = {
  info: <Info className="w-4 h-4 text-secondary" />,
  warning: <AlertTriangle className="w-4 h-4 text-warning" />,
  critical: <AlertOctagon className="w-4 h-4 text-destructive animate-blink-alert" />,
};

export default function AlertCard({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="glass-card-hover p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <span className="text-sm text-muted-foreground font-body">Alerts</span>
        {alerts.some((a) => a.type === "critical") && (
          <span className="w-2 h-2 rounded-full bg-destructive animate-blink-alert ml-auto" />
        )}
      </div>
      <ScrollArea className="h-40">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 py-2 border-b border-border/30 last:border-0"
            >
              {icons[alert.type]}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground font-body truncate">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground">
                  {alert.timestamp.toLocaleTimeString("en-US", { hour12: false })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}

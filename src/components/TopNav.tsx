import { Activity, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopNav() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <nav className="glass-card px-6 py-3 flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="font-display text-lg text-primary neon-text-blue tracking-wider">NeoGuard AI</h1>
      </div>

      <div className="flex items-center gap-6 text-sm font-body">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-muted-foreground">System Online</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="w-4 h-4 text-accent" />
          <span>Health: 98%</span>
        </div>
        <span className="text-muted-foreground font-mono">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </span>
      </div>
    </nav>
  );
}

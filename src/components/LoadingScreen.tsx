import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const text = "Initializing NeoGuard AI Monitoring System";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    const prog = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(prog);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => { clearInterval(typing); clearInterval(prog); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Neural nodes */}
      <div className="relative w-64 h-64 mb-8">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 50 + Math.cos(angle) * 40;
          const y = 50 + Math.sin(angle) * 40;
          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 5px hsl(243 75% 59% / 0.5)",
                  "0 0 20px hsl(243 75% 59% / 0.8)",
                  "0 0 5px hsl(243 75% 59% / 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            />
          );
        })}
        {/* Center logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-lg border-2 border-primary/60 neon-glow-blue" />
        </motion.div>
      </div>

      <h1 className="font-display text-2xl text-primary mb-4 neon-text-blue">NeoGuard AI</h1>
      <p className="text-muted-foreground font-body text-sm h-6 mb-6">
        {displayedText}
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <p className="text-muted-foreground text-xs mt-2 font-body">{progress}%</p>
    </motion.div>
  );
}

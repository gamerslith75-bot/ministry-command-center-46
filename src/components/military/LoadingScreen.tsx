import { Shield } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(i); setTimeout(() => setShow(false), 400); return 100; }
        return p + 4;
      });
    }, 40);
    return () => clearInterval(i);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-background grid place-items-center tactical-grid transition-opacity"
      style={{ opacity: progress >= 100 ? 0 : 1 }}>
      <div className="text-center">
        <div className="relative mx-auto mb-6 w-32 h-32">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
          <Shield className="w-32 h-32 text-primary" strokeWidth={1} />
        </div>
        <div className="text-2xl gold-text font-bold mb-2">وزارة الدفاع</div>
        <div className="font-mono text-xs text-muted-foreground tracking-widest mb-6">INITIALIZING SECURE CONNECTION</div>
        <div className="w-72 h-1 bg-muted rounded overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="font-mono text-xs text-primary mt-2">{progress}% / SCANNING...</div>
      </div>
    </div>
  );
}

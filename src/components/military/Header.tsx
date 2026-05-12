import { Link } from "@tanstack/react-router";
import { Shield, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "الرئيسية" },
  { to: "/branches", label: "الفروع" },
  { to: "/recruitment", label: "التقديم" },
  { to: "/laws", label: "القوانين" },
  { to: "/leadership", label: "القيادة" },
  { to: "/operations", label: "العمليات" },
  { to: "/soldiers", label: "الجنود" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-border/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Shield className="h-9 w-9 text-primary" strokeWidth={1.5} />
            <div className="absolute inset-0 animate-pulse-ring rounded-full border border-primary" />
          </div>
          <div className="text-right leading-tight">
            <div className="text-xs text-muted-foreground tracking-widest font-mono">M.O.D // FIVEM</div>
            <div className="text-base font-bold gold-text">وزارة الدفاع</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((i) => (
            <Link
              key={i.to}
              to={i.to}
              className="px-3 py-2 text-sm font-medium rounded text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium rounded text-primary bg-primary/10" }}
              activeOptions={{ exact: i.to === "/" }}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="font-mono text-xs text-primary border border-primary/30 px-3 py-1.5 rounded bg-primary/5">
            <span className="animate-blink mr-1">●</span>{time}
          </div>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground p-2">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((i) => (
              <Link key={i.to} to={i.to} onClick={() => setOpen(false)}
                className="px-3 py-2 rounded hover:bg-primary/10 text-foreground/90">
                {i.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

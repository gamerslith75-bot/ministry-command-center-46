export function Radar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-square rounded-full border border-primary/40 ${className}`}>
      <div className="absolute inset-2 rounded-full border border-primary/30" />
      <div className="absolute inset-6 rounded-full border border-primary/20" />
      <div className="absolute inset-12 rounded-full border border-primary/15" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/20" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20" />
      <div className="absolute inset-0 animate-radar">
        <div className="absolute top-0 left-1/2 w-1/2 h-1/2"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, oklch(0.78 0.14 90 / 0.4) 60deg, transparent 70deg)",
            transformOrigin: "0% 100%",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-blink" />
      {[
        { top: "30%", left: "60%" },
        { top: "55%", left: "35%" },
        { top: "70%", left: "65%" },
      ].map((s, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-success animate-blink" style={s} />
      ))}
    </div>
  );
}

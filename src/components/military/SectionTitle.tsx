export function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12 animate-fade-up">
      <div className="inline-flex items-center gap-2 text-xs font-mono text-primary tracking-[0.3em] mb-3">
        <span className="h-px w-8 bg-primary" />{kicker}<span className="h-px w-8 bg-primary" />
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

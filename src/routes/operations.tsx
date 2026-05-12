import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { Radar } from "@/components/military/Radar";
import { MapPin, Activity, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/operations")({
  component: Operations,
  head: () => ({ meta: [{ title: "غرفة العمليات — وزارة الدفاع" }] }),
});

const ops = [
  { code: "OP-7741", name: "صقر الصحراء", status: "نشطة", threat: "عالي", units: 24, location: "القطاع الشمالي" },
  { code: "OP-7728", name: "الفجر الذهبي", status: "تخطيط", threat: "متوسط", units: 12, location: "الساحل الشرقي" },
  { code: "OP-7715", name: "العاصفة الزرقاء", status: "نشطة", threat: "حرج", units: 48, location: "الحدود الجنوبية" },
  { code: "OP-7702", name: "الحارس الصامت", status: "مكتملة", threat: "منخفض", units: 8, location: "العاصمة" },
  { code: "OP-7689", name: "النسر الفضي", status: "نشطة", threat: "متوسط", units: 16, location: "المجال الجوي" },
];

const threatColor = (t: string) =>
  t === "حرج" ? "text-destructive border-destructive/40 bg-destructive/10"
  : t === "عالي" ? "text-primary border-primary/40 bg-primary/10"
  : t === "متوسط" ? "text-foreground border-border bg-muted/30"
  : "text-success border-success/40 bg-success/10";

const statusColor = (s: string) =>
  s === "نشطة" ? "text-success" : s === "تخطيط" ? "text-primary" : s === "مكتملة" ? "text-muted-foreground" : "text-destructive";

function Operations() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <SectionTitle kicker="COMMAND CENTER // LIVE FEED" title="غرفة العمليات التكتيكية" subtitle="مراقبة فورية للعمليات العسكرية الجارية" />

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mb-8">
          <div className="glass-panel corner-frame p-6 relative overflow-hidden min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-sm text-primary flex items-center gap-2">
                <MapPin className="h-4 w-4" /> TACTICAL_MAP // LIVE
              </div>
              <span className="font-mono text-xs text-success animate-blink">● TRANSMITTING</span>
            </div>
            <div className="relative h-[340px] tactical-grid rounded border border-border overflow-hidden scan-line">
              <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full opacity-60">
                <path d="M50,150 Q150,50 250,150 T380,150" stroke="oklch(0.78 0.14 90 / 0.4)" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
                <path d="M30,200 L100,180 L180,220 L260,190 L350,210" stroke="oklch(0.42 0.06 130 / 0.6)" strokeWidth="2" fill="none"/>
              </svg>
              {[
                { top: "30%", left: "25%", c: "destructive" },
                { top: "55%", left: "60%", c: "primary" },
                { top: "70%", left: "35%", c: "success" },
                { top: "40%", left: "75%", c: "primary" },
              ].map((p, i) => (
                <div key={i} className="absolute" style={{ top: p.top, left: p.left }}>
                  <div className={`w-3 h-3 rounded-full bg-${p.c} animate-blink`} />
                  <div className={`absolute inset-0 w-3 h-3 rounded-full bg-${p.c} animate-pulse-ring`} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel corner-frame p-6">
            <div className="font-mono text-sm text-primary mb-4">RADAR FEED</div>
            <Radar />
            <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[10px]">
              <div className="border border-border p-2 rounded"><div className="text-muted-foreground">CONTACTS</div><div className="text-success">03</div></div>
              <div className="border border-border p-2 rounded"><div className="text-muted-foreground">RANGE</div><div className="text-primary">5.2 KM</div></div>
            </div>
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <div className="font-bold">العمليات الحالية</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs font-mono tracking-widest text-muted-foreground">
                <tr>
                  {["CODE","العملية","الحالة","مستوى التهديد","الوحدات","الموقع"].map(h => (
                    <th key={h} className="px-4 py-3 text-right font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ops.map((o) => (
                  <tr key={o.code} className="border-t border-border hover:bg-primary/5 transition-colors">
                    <td className="px-4 py-4 font-mono text-primary">{o.code}</td>
                    <td className="px-4 py-4 font-bold">{o.name}</td>
                    <td className={`px-4 py-4 font-bold ${statusColor(o.status)}`}>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />{o.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border ${threatColor(o.threat)}`}>
                        {o.threat === "حرج" && <AlertTriangle className="h-3 w-3" />}{o.threat}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-mono">{o.units}</td>
                    <td className="px-4 py-4 text-muted-foreground">{o.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

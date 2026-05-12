import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { Star, Award, Shield } from "lucide-react";

export const Route = createFileRoute("/leadership")({
  component: Leadership,
  head: () => ({ meta: [{ title: "القيادة العسكرية — وزارة الدفاع" }] }),
});

const leaders = [
  { name: "المشير سلطان الحربي", rank: "وزير الدفاع", stars: 5, branch: "القيادة العامة", id: "M-001" },
  { name: "الفريق أول خالد القحطاني", rank: "رئيس الأركان", stars: 4, branch: "الأركان العامة", id: "M-002" },
  { name: "اللواء الركن فهد العتيبي", rank: "قائد القوات البرية", stars: 3, branch: "البرية", id: "M-003" },
  { name: "الفريق طيار ماجد الشمري", rank: "قائد القوات الجوية", stars: 4, branch: "الجوية", id: "M-004" },
  { name: "أمير البحر سعد الدوسري", rank: "قائد القوات البحرية", stars: 3, branch: "البحرية", id: "M-005" },
  { name: "العقيد الركن نواف الزهراني", rank: "قائد القوات الخاصة", stars: 3, branch: "الخاصة", id: "M-006" },
];

function Leadership() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <SectionTitle kicker="HIGH COMMAND" title="القيادة العسكرية العليا" subtitle="نخبة القادة الذين يديرون منظومة الدفاع" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((l, i) => (
            <div key={l.id} className="glass-panel corner-frame p-6 group glow-hover animate-fade-up" style={{ animationDelay: `${i*0.07}s` }}>
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-xs text-primary">{l.id}</div>
                <div className="flex gap-1">
                  {Array.from({ length: l.stars }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 text-primary fill-primary" />
                  ))}
                </div>
              </div>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/40 group-hover:from-primary/50 transition-all" />
                <div className="absolute inset-0.5 rounded-full bg-background grid place-items-center">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <Award className="absolute -bottom-1 -right-1 h-7 w-7 text-primary bg-background rounded-full p-1 border border-primary" />
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1">{l.name}</div>
                <div className="text-sm gold-text font-bold mb-3">{l.rank}</div>
                <div className="inline-block px-3 py-1 rounded text-[11px] font-mono border border-border bg-muted/40 text-muted-foreground">
                  {l.branch}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { Shield, Plane, Anchor, Crown, Crosshair, Star } from "lucide-react";

export const Route = createFileRoute("/branches")({
  component: Branches,
  head: () => ({ meta: [{ title: "فروع القوات — وزارة الدفاع" }] }),
});

const branches = [
  { icon: Shield, name: "القوات البرية", desc: "العمود الفقري للقوات المسلحة، تتولى الدفاع البري وتنفيذ العمليات على الأرض بكفاءة عالية.", commander: "اللواء الركن", code: "GROUND-01", color: "var(--olive)" },
  { icon: Plane, name: "القوات الجوية", desc: "السيادة الجوية والدفاع الفضائي، تشمل الطائرات المقاتلة والمروحيات الهجومية.", commander: "الفريق طيار", code: "AIR-02" },
  { icon: Anchor, name: "القوات البحرية", desc: "حماية المياه الإقليمية والسواحل، تشمل السفن الحربية والغواصات النووية.", commander: "أمير البحر", code: "NAVY-03" },
  { icon: Crown, name: "الحرس الملكي", desc: "النخبة المختارة لحماية القيادة العليا والشخصيات الحساسة في الدولة.", commander: "قائد الحرس", code: "ROYAL-04" },
  { icon: Crosshair, name: "القوات الخاصة", desc: "العمليات السرية، الاقتحام، وتحرير الرهائن. الوحدة الأكثر تدريبًا في الجيش.", commander: "العقيد الركن", code: "SF-05" },
];

function Branches() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <SectionTitle kicker="MILITARY DIVISIONS" title="فروع القوات المسلحة" subtitle="خمس وحدات نخبوية تعمل بانسجام تام تحت قيادة موحدة" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <div key={b.code} className="glass-panel corner-frame p-6 group glow-hover animate-fade-up flex flex-col" style={{ animationDelay: `${i*0.08}s` }}>
              <div className="flex justify-between items-start mb-5">
                <div className="w-16 h-16 rounded grid place-items-center bg-primary/10 border border-primary/40">
                  <b.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] text-muted-foreground">UNIT CODE</div>
                  <div className="font-mono text-xs text-primary">{b.code}</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">{b.name}</h3>
              <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{b.desc}</p>
              <div className="border-t border-border pt-4 flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] tracking-widest text-muted-foreground">القائد</div>
                  <div className="text-sm font-bold flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-primary fill-primary" />{b.commander}
                  </div>
                </div>
              </div>
              <Link to="/recruitment" className="block text-center py-2.5 rounded bg-primary/10 border border-primary/40 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                انضم للوحدة
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

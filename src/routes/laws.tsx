import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { ChevronDown, AlertTriangle, ShieldAlert, Ban, Scale } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/laws")({
  component: Laws,
  head: () => ({ meta: [{ title: "القوانين العسكرية — وزارة الدفاع" }] }),
});

const sections = [
  { icon: Scale, title: "اللوائح العامة", items: ["الالتزام بالزي الرسمي داخل القاعدة", "احترام التسلسل القيادي بشكل صارم", "حضور التدريبات الأسبوعية إلزامي", "الإخلاص للراية والقسم العسكري"] },
  { icon: ShieldAlert, title: "قواعد الاشتباك", items: ["لا يتم فتح النار إلا بأمر مباشر", "يحظر استهداف المدنيين تحت أي ظرف", "الاستسلام واجب عند طلبه من المدني", "توثيق جميع العمليات العسكرية"] },
  { icon: AlertTriangle, title: "نظام الإنذارات", items: ["إنذار شفهي: مخالفة بسيطة لأول مرة", "إنذار كتابي رسمي: عند تكرار المخالفة", "إيقاف مؤقت: 48-72 ساعة عن الخدمة", "تحويل للقيادة: عند المخالفات الجسيمة"] },
  { icon: Ban, title: "مستويات العقوبات", items: ["المستوى 1: تخفيض رتبة واحدة", "المستوى 2: تخفيض رتبتين + توبيخ علني", "المستوى 3: نقل لوحدة احتياط", "المستوى 4: طرد نهائي وحظر دائم"] },
];

function Laws() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <SectionTitle kicker="MILITARY CODE // CLASSIFIED" title="القوانين والأنظمة العسكرية" subtitle="الالتزام بهذه القوانين شرط أساسي للخدمة في القوات المسلحة" />
        <div className="space-y-3">
          {sections.map((s, i) => (
            <div key={s.title} className="glass-panel overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-right hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded grid place-items-center bg-primary/10 border border-primary/30">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-muted-foreground">SECTION-0{i+1}</div>
                    <div className="font-bold text-lg">{s.title}</div>
                  </div>
                </div>
                <ChevronDown className={`h-5 w-5 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-fade-up">
                  <ul className="space-y-2 border-t border-border pt-4">
                    {s.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-foreground/85">
                        <span className="font-mono text-primary mt-0.5">{String(j+1).padStart(2,"0")}.</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

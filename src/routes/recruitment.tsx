import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/recruitment")({
  component: Recruitment,
  head: () => ({ meta: [{ title: "التقديم العسكري — وزارة الدفاع" }] }),
});

function Recruitment() {
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [form, setForm] = useState({ name: "", age: "", id: "", exp: "", reason: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.id || !form.reason) { setStatus("error"); return; }
    setStatus("success");
    setForm({ name: "", age: "", id: "", exp: "", reason: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };
  const fields = [
    { k: "name", label: "الاسم الكامل", type: "text", placeholder: "أدخل اسمك في اللعبة" },
    { k: "age", label: "العمر", type: "number", placeholder: "18+" },
    { k: "id", label: "الايدي (Steam ID)", type: "text", placeholder: "STEAM_0:..." },
    { k: "exp", label: "الخبرات السابقة", type: "text", placeholder: "اختياري" },
  ] as const;
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <SectionTitle kicker="RECRUITMENT // SECURE" title="التقديم العسكري" subtitle="املأ النموذج بدقة. سيتم مراجعة الطلب من قبل القيادة." />
        <form onSubmit={submit} className="glass-panel corner-frame p-6 md:p-10 space-y-5 relative scan-line">
          <div className="font-mono text-xs text-primary mb-2">FORM-ID: REC-{Math.floor(Math.random()*9000+1000)}</div>
          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.k} className={f.k === "exp" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-bold mb-1.5 text-foreground/90">{f.label}</label>
                <input
                  type={f.type} value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 bg-input/60 border border-border rounded font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-1.5">سبب الانضمام</label>
              <textarea rows={5} value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                placeholder="اشرح دوافعك للانضمام للقوات المسلحة..."
                className="w-full px-4 py-3 bg-input/60 border border-border rounded text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" />
            </div>
          </div>
          {status === "success" && (
            <div className="flex items-center gap-3 p-4 rounded border border-success/40 bg-success/10 text-success animate-fade-up">
              <CheckCircle2 className="h-5 w-5" /> تم استلام طلبك بنجاح. سنتواصل معك قريبًا عبر Discord.
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-3 p-4 rounded border border-destructive/40 bg-destructive/10 text-destructive animate-fade-up">
              <AlertCircle className="h-5 w-5" /> الرجاء تعبئة جميع الحقول الإلزامية.
            </div>
          )}
          <button type="submit" className="w-full py-4 rounded bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 glow-hover">
            <Send className="h-4 w-4" /> إرسال الطلب
          </button>
        </form>
      </div>
    </Layout>
  );
}

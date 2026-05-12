import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/military/Layout";
import { SectionTitle } from "@/components/military/SectionTitle";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, User, Filter } from "lucide-react";

export const Route = createFileRoute("/soldiers")({
  component: SoldiersPage,
  head: () => ({ meta: [{ title: "سجل الجنود — وزارة الدفاع" }] }),
});

type Status = "active" | "mission" | "leave" | "reserve";

type Soldier = {
  id: string;
  name: string;
  rank: string;
  unit: string;
  status: Status;
  phone?: string;
  email?: string;
  avatar?: string;
};

// Static dataset — swap with a Lovable Cloud query when DB is wired.
const SOLDIERS: Soldier[] = [
  { id: "S-1042", name: "خالد بن سلطان", rank: "عقيد ركن", unit: "القوات الخاصة", status: "active", phone: "+966 50 111 2233", email: "k.sultan@mod.gov" },
  { id: "S-1043", name: "فهد العتيبي", rank: "رائد طيار", unit: "القوات الجوية", status: "mission", phone: "+966 55 998 7766" },
  { id: "S-1044", name: "ناصر الدوسري", rank: "نقيب", unit: "القوات البرية", status: "active", email: "n.dosari@mod.gov" },
  { id: "S-1045", name: "سعود القحطاني", rank: "ملازم أول", unit: "الحرس الملكي", status: "leave" },
  { id: "S-1046", name: "بدر الشمري", rank: "أمير لواء بحري", unit: "القوات البحرية", status: "active", phone: "+966 53 442 8810" },
  { id: "S-1047", name: "ماجد الحربي", rank: "رقيب أول", unit: "القوات البرية", status: "reserve" },
  { id: "S-1048", name: "تركي الغامدي", rank: "نقيب", unit: "الاستخبارات العسكرية", status: "mission", email: "t.ghamdi@mod.gov" },
  { id: "S-1049", name: "عبدالعزيز المالكي", rank: "ملازم", unit: "القوات الخاصة", status: "active", phone: "+966 56 220 1144" },
  { id: "S-1050", name: "يوسف العنزي", rank: "رقيب", unit: "القوات الجوية", status: "leave", email: "y.anazi@mod.gov" },
  { id: "S-1051", name: "راكان السبيعي", rank: "عريف", unit: "الحرس الملكي", status: "active" },
  { id: "S-1052", name: "مشعل الزهراني", rank: "مقدم", unit: "القوات البحرية", status: "active", phone: "+966 50 778 3322", email: "m.zahrani@mod.gov" },
  { id: "S-1053", name: "وليد القرني", rank: "نقيب", unit: "الاستخبارات العسكرية", status: "reserve" },
];

const UNITS = ["all", "القوات البرية", "القوات الجوية", "القوات البحرية", "الحرس الملكي", "القوات الخاصة", "الاستخبارات العسكرية"] as const;

const statusMeta: Record<Status, { label: string; dot: string; chip: string }> = {
  active:  { label: "نشط",        dot: "bg-success",     chip: "bg-success/10 text-success border-success/30" },
  mission: { label: "في مهمة",    dot: "bg-primary",     chip: "bg-primary/10 text-primary border-primary/30" },
  leave:   { label: "في إجازة",   dot: "bg-muted-foreground", chip: "bg-muted text-muted-foreground border-border" },
  reserve: { label: "احتياط",     dot: "bg-destructive", chip: "bg-destructive/10 text-destructive border-destructive/30" },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function Avatar({ s }: { s: Soldier }) {
  const [errored, setErrored] = useState(false);
  if (s.avatar && !errored) {
    return (
      <img
        src={s.avatar}
        alt={s.name}
        loading="lazy"
        width={48}
        height={48}
        onError={() => setErrored(true)}
        className="h-12 w-12 rounded-full object-cover border border-primary/30 bg-muted"
      />
    );
  }
  return (
    <div className="h-12 w-12 rounded-full grid place-items-center bg-primary/10 border border-primary/30 text-primary font-bold text-sm">
      {initials(s.name) || <User className="h-5 w-5" />}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const m = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${m.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot} animate-blink`} />
      {m.label}
    </span>
  );
}

function ContactInfo({ s }: { s: Soldier }) {
  if (!s.phone && !s.email) return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <div className="flex flex-col gap-1 text-xs">
      {s.phone && (
        <a href={`tel:${s.phone}`} className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors" dir="ltr">
          <Phone className="h-3 w-3" />{s.phone}
        </a>
      )}
      {s.email && (
        <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors truncate" dir="ltr">
          <Mail className="h-3 w-3" />{s.email}
        </a>
      )}
    </div>
  );
}

function SoldiersPage() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState<(typeof UNITS)[number]>("all");
  const [status, setStatus] = useState<"all" | Status>("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SOLDIERS.filter((s) => {
      if (unit !== "all" && s.unit !== unit) return false;
      if (status !== "all" && s.status !== status) return false;
      if (!q) return true;
      return [s.name, s.rank, s.unit, s.id].some((f) => f.toLowerCase().includes(q));
    });
  }, [query, unit, status]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <SectionTitle
          kicker="PERSONNEL REGISTRY"
          title="سجل الجنود"
          subtitle="قاعدة بيانات شاملة لجميع المنتسبين العاملين تحت قيادة الوزارة"
        />

        {/* Toolbar */}
        <div className="glass-panel rounded-xl p-4 md:p-5 mb-6 grid gap-3 md:grid-cols-[1fr_auto_auto] items-center">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالاسم، الرتبة، أو الرقم العسكري..."
              className="pr-10 h-11 bg-background/40 border-border/60 focus-visible:ring-primary/40"
            />
          </div>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as typeof unit)}
              className="h-11 pr-10 pl-4 rounded-md bg-background/40 border border-border/60 text-sm w-full md:min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>{u === "all" ? "كل الوحدات" : u}</option>
              ))}
            </select>
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="h-11 px-4 rounded-md bg-background/40 border border-border/60 text-sm w-full md:min-w-[160px] focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="all">كل الحالات</option>
            <option value="active">نشط</option>
            <option value="mission">في مهمة</option>
            <option value="leave">في إجازة</option>
            <option value="reserve">احتياط</option>
          </select>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            {rows.length} / {SOLDIERS.length} RECORDS
          </div>
          <div className="font-mono text-[10px] text-success animate-blink">● LIVE FEED</div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block glass-panel rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary/5 border-b border-border/60">
                <tr className="text-right text-[11px] font-bold tracking-widest text-muted-foreground">
                  <th className="px-5 py-4">الجندي</th>
                  <th className="px-5 py-4">الرتبة</th>
                  <th className="px-5 py-4">الوحدة</th>
                  <th className="px-5 py-4">الحالة</th>
                  <th className="px-5 py-4">معلومات التواصل</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 last:border-0 hover:bg-primary/5 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar s={s} />
                        <div className="leading-tight">
                          <div className="font-bold group-hover:text-primary transition-colors">{s.name}</div>
                          <div className="font-mono text-[10px] text-muted-foreground tracking-widest">{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-foreground/90">{s.rank}</td>
                    <td className="px-5 py-4 text-foreground/80">{s.unit}</td>
                    <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                    <td className="px-5 py-4"><ContactInfo s={s} /></td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center text-muted-foreground">
                      لا توجد نتائج مطابقة للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {rows.map((s) => (
            <div key={s.id} className="glass-panel rounded-xl p-4 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <Avatar s={s} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-bold truncate">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.rank}</div>
                    </div>
                    <StatusBadge status={s.status} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/40 text-xs">
                <div>
                  <div className="text-[10px] text-muted-foreground tracking-widest mb-1">الوحدة</div>
                  <div className="text-foreground/90">{s.unit}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground tracking-widest mb-1">الرقم</div>
                  <div className="font-mono text-primary">{s.id}</div>
                </div>
                {(s.phone || s.email) && (
                  <div className="col-span-2 pt-2 border-t border-border/40">
                    <ContactInfo s={s} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="glass-panel rounded-xl p-8 text-center text-muted-foreground">
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

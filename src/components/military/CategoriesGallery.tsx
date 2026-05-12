import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import groundImg from "@/assets/branches/ground.jpg";
import airImg from "@/assets/branches/air.jpg";
import navyImg from "@/assets/branches/navy.jpg";
import royalImg from "@/assets/branches/royal.jpg";
import specialImg from "@/assets/branches/special.jpg";
import placeholderImg from "@/assets/branches/placeholder.jpg";

export type BranchCategory = {
  id: string;
  name: string;
  description?: string;
  cover?: string;
  code: string;
};

// In production this list would come from Lovable Cloud (DB/Storage).
// Keeping it local for now — swap the source without touching the UI.
const CATEGORIES: BranchCategory[] = [
  { id: "ground", code: "GROUND-01", name: "القوات البرية", description: "العمود الفقري للدفاع البري وتنفيذ العمليات على الأرض.", cover: groundImg },
  { id: "air", code: "AIR-02", name: "القوات الجوية", description: "السيادة الجوية والدفاع الفضائي للمجال الوطني.", cover: airImg },
  { id: "navy", code: "NAVY-03", name: "القوات البحرية", description: "حماية المياه الإقليمية والسواحل من أي تهديد.", cover: navyImg },
  { id: "royal", code: "ROYAL-04", name: "الحرس الملكي", description: "النخبة المختارة لحماية القيادة العليا.", cover: royalImg },
  { id: "special", code: "SF-05", name: "القوات الخاصة", description: "العمليات السرية، الاقتحام، وتحرير الرهائن.", cover: specialImg },
  { id: "intel", code: "INT-06", name: "الاستخبارات العسكرية", description: "جمع المعلومات وتحليل التهديدات الاستراتيجية." },
];

function CategoryCard({ c, index }: { c: BranchCategory; index: number }) {
  const [errored, setErrored] = useState(false);
  const src = !errored && c.cover ? c.cover : placeholderImg;
  const isFallback = !c.cover || errored;

  return (
    <Link
      to="/branches"
      className="group relative flex flex-col h-full overflow-hidden rounded-lg glass-panel corner-frame animate-fade-up glow-hover"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={src}
          alt={c.name}
          width={1024}
          height={640}
          loading="lazy"
          onError={() => setErrored(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 tactical-grid opacity-30 mix-blend-overlay" />

        {/* Top meta */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between font-mono text-[10px]">
          <span className="px-2 py-1 rounded bg-background/70 backdrop-blur border border-primary/30 text-primary tracking-widest">
            {c.code}
          </span>
          {isFallback && (
            <span className="px-2 py-1 rounded bg-background/70 backdrop-blur border border-border text-muted-foreground inline-flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> CLASSIFIED
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg md:text-xl font-bold mb-2 transition-colors group-hover:text-primary">
          {c.name}
        </h3>
        {c.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {c.description}
          </p>
        )}
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary opacity-80 group-hover:opacity-100 group-hover:gap-2.5 transition-all">
          عرض التفاصيل <ChevronLeft className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export function CategoriesGallery({ items = CATEGORIES }: { items?: BranchCategory[] }) {
  return (
    <section className="container mx-auto px-4 py-20 md:py-24">
      <SectionTitle
        kicker="CATEGORIES"
        title="فئات الفروع العسكرية"
        subtitle="استعرض جميع الوحدات العاملة تحت قيادة وزارة الدفاع"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-fr">
        {items.map((c, i) => (
          <CategoryCard key={c.id} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/military/Layout";
import { Radar } from "@/components/military/Radar";
import { CategoriesGallery } from "@/components/military/CategoriesGallery";
import { ChevronLeft, Activity, Users, Target, Award } from "lucide-react";
import heroImg from "@/assets/hero-military.jpg";

export const Route = createFileRoute("/")({ component: Home });

const stats = [
  { icon: Users, label: "جنود نشطون", value: "1,247" },
  { icon: Target, label: "عمليات مكتملة", value: "8,932" },
  { icon: Activity, label: "مهام جارية", value: "23" },
  { icon: Award, label: "أوسمة شرف", value: "451" },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden flex items-center">
        <img src={heroImg} alt="Military command center" width={1920} height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 tactical-grid opacity-40" />
        <div className="container relative mx-auto px-4 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center py-20">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded glass-panel font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-success animate-blink" />
              <span className="text-success">CLASSIFIED</span>
              <span className="text-muted-foreground">// SECURE CHANNEL ACTIVE</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-4">
              <span className="gold-text">وزارة الدفاع</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-3">
              القيادة العسكرية العليا لسيرفر <span className="text-primary font-bold">FiveM</span>
            </p>
            <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
              منظومة دفاعية متكاملة تجمع نخبة الجنود تحت راية واحدة. انضم إلى صفوف الأبطال وكن جزءًا من أعظم قوة عسكرية في عالم الروليبلاي.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/recruitment"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold bg-primary text-primary-foreground glow-hover">
                التقديم العسكري
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
              <Link to="/operations"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold glass-panel border border-primary/40 text-foreground hover:bg-primary/10 transition-colors">
                الدخول للنظام
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="glass-panel corner-frame p-6 relative scan-line overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div className="font-mono text-xs text-primary">TACTICAL_RADAR_v3.2</div>
                <div className="font-mono text-xs text-success animate-blink">● ONLINE</div>
              </div>
              <Radar className="max-w-[320px] mx-auto" />
              <div className="grid grid-cols-3 gap-2 mt-6 font-mono text-[10px]">
                {[["LAT","24.7136°N"],["LON","46.6753°E"],["GRID","A7-X9"]].map(([k,v]) => (
                  <div key={k} className="border border-border p-2 rounded">
                    <div className="text-muted-foreground">{k}</div>
                    <div className="text-primary">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-panel corner-frame p-6 text-center glow-hover animate-fade-up" style={{ animationDelay: `${i*0.1}s` }}>
              <s.icon className="h-7 w-7 text-primary mx-auto mb-2" />
              <div className="text-3xl font-black gold-text">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Branches preview */}
      <CategoriesGallery />
      <div className="container mx-auto px-4 -mt-8 pb-20 text-center">
          <Link to="/branches" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            استكشف جميع الفروع <ChevronLeft className="h-4 w-4" />
          </Link>
      </div>
    </Layout>
  );
}

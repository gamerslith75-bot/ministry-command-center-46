import { Shield, MessageCircle, Server, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40 backdrop-blur">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <div className="font-bold text-lg gold-text">وزارة الدفاع</div>
              <div className="text-xs text-muted-foreground font-mono">MINISTRY OF DEFENSE</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            القيادة العسكرية العليا لسيرفر FiveM. نحمي السيادة، نحفظ النظام، وندرّب الأبطال.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-primary text-sm tracking-widest">الخادم</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Server className="h-4 w-4" /> connect.fivem.mod</div>
            <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="h-4 w-4" /> Discord الرسمي
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-primary text-sm tracking-widest">تابعنا</h4>
          <div className="flex gap-3">
            {[Twitter, Youtube, Instagram, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded glass-panel glow-hover text-foreground/80 hover:text-primary">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/50 py-4 text-center text-xs text-muted-foreground font-mono">
        © 2026 MINISTRY OF DEFENSE — FIVEM ROLEPLAY. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LoadingScreen } from "./LoadingScreen";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col">
      <LoadingScreen />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

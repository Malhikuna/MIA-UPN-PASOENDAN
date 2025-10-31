import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {Suspense} from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Suspense fallback={<div />}>
        <Navbar />
      </Suspense>

      {children}

      <Footer />
    </div>
  );
}

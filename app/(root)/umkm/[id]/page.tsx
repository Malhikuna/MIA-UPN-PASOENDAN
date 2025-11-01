"use client";
import { notFound } from "next/navigation";
import React from "react";
import ProductCard from "@/components/ui/detail/ProductCard";
import LocationMap from "@/components/ui/map/LocationMap";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import UmkmProfile from "@/components/ui/detail/UmkmProfile";
import { useUmkm } from "@/hooks/useUmkm";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const umkmData = useUmkm();
  const umkm = umkmData.find((item) => item.id === parseInt(id));

  if (!umkm) notFound();

  return (
    <div className="flex flex-col gap-20 pb-8">
      {/* Hero */}
      <section
        style={{
          backgroundImage: "url('/images/example.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative w-full h-auto bg-center bg-cover overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-xs" />

        <div className="relative container mx-auto px-6 lg:px-12 py-16">
          <div className="mb-5">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: umkm.name }]} />
          </div>

          {/* UMKM Profile */}
          <UmkmProfile umkm={umkm} />
        </div>
      </section>

      {/* List Card Product */}
      <section className="container mx-auto px-6 lg:px-12">
        <h1 className="text-center text-2xl font-bold mb-5">
          Produk <span className="text-primary-content">Kami</span>
        </h1>

        <div className="flex gap-15 overflow-x-auto w-full h-auto py-2 scrollbar-hide snap-x snap-mandatory">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="snap-center flex-shrink-0 w-[250px]">
                <ProductCard />
              </div>
            ))}
        </div>
      </section>

      {/* Location */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            Temukan <span className="text-primary-content">Kami</span> di Sini
          </h1>

          <p className="text-center md:text-left max-w-150">
            Yuk, mampir langsung ke lokasi kami dan dukung usaha lokal di sekitarmu. Setiap kunjunganmu berarti besar
            bagi kami.
          </p>
        </div>
        <LocationMap umkm={umkm} mode={"detail"} />
      </section>

      {/* Review */}
      {/*<section className="px-8">
        <BoxReview/>
      </section>*/}
    </div>
  );
}

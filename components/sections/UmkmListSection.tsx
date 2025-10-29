"use client";
import { useUmkmLogic } from "@/app/lib/umkm";
import Card from "@/components/ui/Card";
import { UmkmItem } from "@/types/umkm";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function UmkmListSection() {
  const { listTitle, filteredData, handleReset } = useUmkmLogic();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const cards = sliderRef.current.children;
      
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          x: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [filteredData]);

  const hasResults = filteredData.length > 0;
  const displayedData = filteredData.slice(0, 6); // Tampilkan maksimal 6 item di slider

  return (
    <div className="container mx-auto py-5 md:py-10 px-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terdekat</span>
        </h1>

        {filteredData.length > 0 && (
          <Link
            href="/umkm"
            className="flex items-center gap-2 hover:text-primary-content transition-colors group"
          >
            <p className="font-semibold">Show All</p>
            <ChevronRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Horizontal Slider */}
      {hasResults && (
        <div className="relative mt-8">
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {displayedData.map((umkm: UmkmItem) => (
              <Link 
                href={`/umkm/${umkm.id}`} 
                key={umkm.id}
                className="flex-shrink-0 w-[300px] md:w-[350px] snap-start"
              >
                <Card title={umkm.title} address={umkm.address} image={umkm.images[0]} />
              </Link>
            ))}
          </div>
        
        </div>
      )}

      {/* Empty State */}
      {!hasResults && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada UMKM ditemukan untuk kategori ini</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-primary-content text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
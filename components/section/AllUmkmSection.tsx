"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { UmkmItem } from "@/types/umkm";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useUmkm } from "@/hooks/useUmkm";

export default function AllUmkmSection() {
  const { umkmList, loading } = useUmkm();
  const { handleReset } = useUmkmLogic();
  const gridRef = useRef<HTMLDivElement>(null);

  const { currentPage, totalPages, paginatedItems, goToPage, goToPrevious, goToNext, getPageNumbers } = usePagination({
    items: umkmList as UmkmItem[],
    itemsPerPage: 9,
    showAll: true,
  });

  // Animasi saat ganti halaman
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.children;

      const tl = gsap.timeline();

      // Fade out
      tl.to(cards, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.03,
      });

      // Fade in
      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "+=0.1"
      );
    }
  }, [currentPage, paginatedItems]);

  const hasResults = umkmList.length > 0;
  const showPagination = umkmList.length > 9;

  return (
    <div className="container mx-auto py-5 md:py-10 px-4 md:px-8 lg:px-12 min-h-screen">
      {loading && (
        <div className="h-[280px] w-full flex flex-col justify-center items-center bg-gray-100 rounded-xl">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin mb-2" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      )}

      {/* Cards Grid */}
      {hasResults && (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[530px]">
          {paginatedItems.map((umkm: UmkmItem) => (
            <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
              <Card title={umkm.name} address={umkm.address} image={umkm.imageUrl[0]} />
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={goToPrevious}
          onNext={goToNext}
          getPageNumbers={getPageNumbers}
        />
      )}

      {/* Empty State */}
      {!hasResults && !loading && (
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

"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { UmkmItem } from "@/types/umkm";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Input from "@/components/ui/Input";
import { useUmkmStore } from "@/store/useUmkmStore";

export default function UmkmPage() {
  const { searchQuery, setSearchQuery } = useUmkmStore();
  const { currentSubCategories, filteredData, handleReset, handleSubCategoryChange } = useUmkmLogic();
  const gridRef = useRef<HTMLDivElement>(null);

  const { currentPage, totalPages, paginatedItems, goToPage, goToPrevious, goToNext, getPageNumbers } = usePagination({
    items: filteredData,
    itemsPerPage: 9,
    showAll: true,
  });

  console.log(paginatedItems);

  const { selectedMainCategory } = useUmkmStore();
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

  const hasResults = filteredData.length > 0;
  const showPagination = filteredData.length > 9;

  return (
    <div className="container mx-auto py-5 md:py-10 px-12 min-h-screen border">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-8 mt-12">
        <h1 className="font-bold text-3xl">
          Semua Umkm <span className="text-primary-content">{(selectedMainCategory as string).toUpperCase()}</span>
        </h1>

        <div className="flex justify-between items-center gap-7">
          <details className="dropdown">
            <summary className="btn m-1">Filter {<ChevronDown />}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li
                className="p-1.5 hover:bg-foreground/10 rounded-lg cursor-pointer"
                // onClick={() => handleSubCategoryChange(subcat.value)}
              >
                Terbaru
              </li>
              <li className="p-1.5 hover:bg-foreground/10 rounded-lg cursor-pointer">Terdekat</li>
            </ul>
          </details>
          <details className="dropdown">
            <summary className="btn m-1">Category {<ChevronDown />}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              {currentSubCategories.map((subcat) => {
                return (
                  <li
                    key={subcat.value}
                    className="p-1.5 hover:bg-foreground/10 rounded-lg cursor-pointer"
                    onClick={() => handleSubCategoryChange(subcat.value)}
                  >
                    {subcat.label}
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
      </div>

      {/* Cards Grid */}
      {hasResults && (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[530px]">
          {paginatedItems.map((umkm: UmkmItem) => (
            <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
              <Card title={umkm.title} address={umkm.address} image={umkm.images[0]} />
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

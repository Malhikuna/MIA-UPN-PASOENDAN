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
  const {
    currentSubCategories,
    filteredData,
    handleReset,
    handleSubCategoryChange,
  } = useUmkmLogic();
  const gridRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDetailsElement>(null);
  const categoryDropdownRef = useRef<HTMLDetailsElement>(null);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToPrevious,
    goToNext,
    getPageNumbers,
  } = usePagination({
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

  const closeDropdown = (ref: React.RefObject<HTMLDetailsElement | null>) => {
    if (ref.current) {
      ref.current.open = false;
    }
  };

  const handleCategoryClick = (value: string) => {
    handleSubCategoryChange(value);
    closeDropdown(categoryDropdownRef);
  };

  return (
    <div className="container mx-auto py-5 md:py-10 px-4 md:px-8 lg:px-12 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6 md:mb-8 mt-12 md:mt-12 gap-4">
        <h1 className="font-bold text-2xl md:text-3xl">
          Semua Umkm{" "}
          <span className="text-primary-content">
            {(selectedMainCategory as string).toUpperCase()}
          </span>
        </h1>

        <div className="flex justify-start md:justify-between items-center gap-2 md:gap-7">
          <details ref={filterDropdownRef} className="dropdown">
            <summary className="btn btn-sm md:btn-md m-0 md:m-1 text-xs md:text-sm rounded-[5px] ">
              Filter {<ChevronDown className="w-4 h-4" />}
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li
                className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => closeDropdown(filterDropdownRef)}
              >
                Terbaru
              </li>
              <li
                className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => closeDropdown(filterDropdownRef)}
              >
                Terdekat
              </li>
            </ul>
          </details>
          <details ref={categoryDropdownRef} className="dropdown">
            <summary className="btn btn-sm md:btn-md m-0 md:m-1 text-xs md:text-sm">
              Category {<ChevronDown className="w-4 h-4" />}
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              {currentSubCategories.map((subcat) => {
                return (
                  <li
                    key={subcat.value}
                    className="p-1.5 hover:bg-primary-content/10 hover:text-primary-content rounded-lg cursor-pointer transition-all duration-200"
                    onClick={() => handleCategoryClick(subcat.value)}
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
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[530px]"
        >
          {paginatedItems.map((umkm: UmkmItem) => (
            <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
              <Card
                title={umkm.name}
                address={umkm.address}
                image={umkm.imageUrl[0]}
              />
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
          <p className="text-gray-500 text-lg">
            Tidak ada UMKM ditemukan untuk kategori ini
          </p>
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

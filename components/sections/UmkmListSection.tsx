"use client";
import Card from "@/components/ui/Card";
import { usePagination } from "@/hooks/usePagination";
import { UmkmItem } from "@/types/umkm";
import { ChevronDown, } from "lucide-react";
import Link from "next/link";
import Pagination from "../ui/Pagination";

interface UmkmListSectionProps {
  title: string;
  filteredData: UmkmItem[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onReset: () => void;
}

export default function UmkmListSection({
  title,
  filteredData,
  showAll,
  onToggleShowAll,
  onReset,
}: UmkmListSectionProps) {

    const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToPrevious,
    goToNext,
    resetPage,
    getPageNumbers,
  } = usePagination({
    items: filteredData,
    itemsPerPage: 6,
    showAll,
  });

  const handleToggleShowAll = () => {
    resetPage();
    onToggleShowAll();
  };

  const hasResults = filteredData.length > 0;
  const showPagination = showAll && filteredData.length > 6;
  return (
    <div className="container mx-auto py-5 md:py-10 px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">
          {title} <span className="text-primary-content">Terdekat</span>
        </h1>

        {filteredData.length > 3 && (
          <button
            onClick={handleToggleShowAll}
            className="flex items-center gap-2 hover:text-primary-content transition-colors"
          >
            <p className="font-semibold">{showAll ? "Show Less" : "See All"}</p>
            <ChevronDown className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Cards Grid */}
       {hasResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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
      {/* No Results */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada UMKM ditemukan untuk kategori ini</p>
          <button
            onClick={onReset}
            className="mt-4 px-6 py-2 bg-primary-content text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Reset Filter
          </button>
        </div>
      )}

    </div>
  );
}
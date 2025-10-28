"use client";
import { useUmkmLogic } from "@/app/lib/umkm";
import Card from "@/components/ui/Card";
import { useUmkmStore } from "@/store/useUmkmStore";
import { UmkmItem } from "@/types/umkm";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface UmkmListSectionProps {
  title: string;
  filteredData: UmkmItem[];
  displayedData: UmkmItem[];
  showAll: boolean;
  onToggleShowAll: () => void;
  onReset: () => void;
}

export default function UmkmListSection() {
  const { listTitle, filteredData, displayedData, handleReset } = useUmkmLogic();

  const { showAll, setShowAll } = useUmkmStore();
  return (
    <div className="container mx-auto py-5 md:py-10 px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terdekat</span>
        </h1>

        {filteredData.length > 3 && (
          <button
            onClick={(e) => setShowAll(!showAll)}
            className="flex items-center gap-2 hover:text-primary-content transition-colors"
          >
            <p className="font-semibold">{showAll ? "Show Less" : "See All"}</p>
            <ChevronDown className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {displayedData.map((umkm: UmkmItem) => (
          <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
            <Card title={umkm.title} address={umkm.address} image={umkm.images[0]} />
          </Link>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Tidak ada UMKM ditemukan untuk kategori ini</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-primary-content text-white rounded-lg hover:bg-primary-content"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}

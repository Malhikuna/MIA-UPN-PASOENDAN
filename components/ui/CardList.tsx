"use client";

import { useNearbyUmkm, useNewestUmkm } from "@/hooks/useUmkm";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { ChevronRight, Loader2 } from "lucide-react";
import { use, useEffect, useRef } from "react";
import Card from "./Card";
import { UmkmItem } from "@/types/umkm";
import Link from "next/link";
import gsap from "gsap";

type CardListProps = {
  useUmkm: () => {
    umkmList: UmkmItem[];
    loading: boolean;
    error: string | null;
  };
};

const CardList = ({ useUmkm }: CardListProps) => {
  const { handleReset } = useUmkmLogic();

  const sliderRef = useRef<HTMLDivElement>(null);
  const { umkmList, loading, error } = useUmkm();

  const displayedData = umkmList;

  // Animasi untuk section Terdekat
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
  }, [displayedData]);

  return (
    <>
      {/* Horizontal Slider */}
      {displayedData && !loading && (
        <div className="relative mt-5">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayedData.map((umkm: UmkmItem) => (
              <Link href={`/umkm/${umkm.id}`} key={umkm.id} className="flex-shrink-0 w-[300px] md:w-[350px] snap-start">
                <Card title={umkm.name} address={umkm.address} image={umkm.imageUrl[0]} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="h-[280px] w-full flex flex-col justify-center items-center bg-gray-100 rounded-xl">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin mb-2" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      )}

      {displayedData.length === 0 && !loading && (
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
    </>
  );
};

export default CardList;

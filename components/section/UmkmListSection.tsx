"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import Card from "@/components/ui/Card";
import { UmkmItem } from "@/types/umkm";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import Loading from "@/app/(root)/loading";

export default function UmkmListSection() {
  const { listTitle, filteredData, handleReset, loading} = useUmkmLogic();
  const sliderRef = useRef<HTMLDivElement>(null);
  const newestSliderRef = useRef<HTMLDivElement>(null);

  /*if (loading) {
    return <Loading page="detail"></Loading>
  }*/

  // Sort data terbaru berdasarkan ID terbesar ke terkecil
  const newestData = useMemo(() => {
    return [...filteredData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [filteredData]);

  console.log([...filteredData]);

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
  }, [filteredData]);

  // Animasi untuk section Terbaru
  useEffect(() => {
    if (newestSliderRef.current) {
      const cards = newestSliderRef.current.children;

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
  }, [newestData]);

  const hasResults = filteredData.length > 0;
  const displayedData = filteredData.slice(0, 6);
  const displayedNewestData = newestData.slice(0, 6);

  return (
    <section className="container mx-auto py-5 md:py-5 px-8 md:px-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terdekat</span>
        </h1>

        {filteredData.length > 0 && (
          <Link href="/umkm" className="flex items-center gap-2 hover:text-primary-content transition-colors group">
            <p className="font-semibold">Show All</p>
            <ChevronRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Horizontal Slider */}
      {hasResults && (
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

      {/* Section F&B Terbaru */}
      {hasResults && (
        <div className="mt-6 pt-6 border-t-2 border-gray-200">
          {/* Header Terbaru */}
          <div className="flex justify-between items-center mb-3">
            <h1 className="font-bold text-2xl">
              {listTitle} <span className="text-primary-content">Terbaru</span>
            </h1>

            {newestData.length > 0 && (
              <Link href="/umkm" className="flex items-center gap-2 hover:text-primary-content transition-colors group">
                <p className="font-semibold">Show All</p>
                <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Horizontal Slider Terbaru */}
          <div className="relative mt-5 ">
            <div
              ref={newestSliderRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {displayedNewestData.map((umkm: UmkmItem) => (
                <Link
                  href={`/umkm/${umkm.id}`}
                  key={`newest-${umkm.id}`}
                  className="flex-shrink-0 w-[300px] md:w-[350px] snap-start"
                >
                  <Card title={umkm.name} address={umkm.address} image={umkm.imageUrl[0]} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

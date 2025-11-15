"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import {useNearestUmkm, useNewestUmkm} from "@/hooks/useUmkm";
import CardList from "../ui/CardList";
import { useUserLocationStore } from "@/store/useUserLocationStore";
import Image from "next/image";

export default function UmkmListSection() {
  const { listTitle, handleCurrentFilterChange } = useUmkmLogic();
  const { userLocation, fetchUserLocation } = useUserLocationStore();

  return (
    <section className="container mx-auto py-5 md:py-5 px-8 md:px-12">

      {/* Nearest UMKM */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terdekat</span>
        </h1>

        <Link
          href="/umkm"
          className="flex items-center gap-2 hover:text-primary-content transition-colors group"
          onClick={() => handleCurrentFilterChange("nearest")}
        >
          <p className="font-semibold">Show All</p>
          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      {userLocation ? (
        <CardList useUmkm={useNearestUmkm} />
      ) : (
        <div className="h-[280px] w-full flex flex-col justify-center items-center bg-gray-100 rounded-xl">
          <Image src="/images/enable-location.webp" alt="Enable Location" width={250} height={250} className="" />
          <p className=" font-medium mb-3">Aktifkan lokasi untuk melihat UMKM terdekat di sekitar Anda.</p>
          <button
            onClick={fetchUserLocation}
            className="p-3 bg-primary-content/90 text-primary-content-bright hover:bg-primary-content/70 rounded-2xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MapPin /> Aktifkan Lokasi
          </button>
        </div>
      )}

      {/* Newest UMKM */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terbaru</span>
        </h1>

        <Link
          href="/umkm"
          className="flex items-center gap-2 hover:text-primary-content transition-colors group"
          onClick={() => handleCurrentFilterChange("newest")}
        >
          <p className="font-semibold">Show All</p>
          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <CardList useUmkm={useNewestUmkm} />
    </section>
  );
}

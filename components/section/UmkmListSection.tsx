"use client";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { ChevronRight, MapPin, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useNearbyUmkm, useNewestUmkm } from "@/hooks/useUmkm";
import CardList from "../ui/CardList";
import { useUserLocationStore } from "@/store/useUserLocationStore";

export default function UmkmListSection() {
  const { listTitle } = useUmkmLogic();
  const { userLocation, fetchUserLocation } = useUserLocationStore();

  console.log(userLocation);

  return (
    <section className="container mx-auto py-5 md:py-5 px-8 md:px-12">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terdekat</span>
        </h1>

        <Link href="/umkm" className="flex items-center gap-2 hover:text-primary-content transition-colors group">
          <p className="font-semibold">Show All</p>
          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      {userLocation ? (
        <CardList useUmkm={useNearbyUmkm} />
      ) : (
        <div className="h-[280px] w-full flex flex-col justify-center gap-4 items-center bg-gray-100 rounded-xl text-red-600">
          <div className="flex gap-4">
            <TriangleAlert />
            <span>Location Error.</span>
          </div>
          <p className=" font-medium">Location information denied, please enable location access.</p>
          <button
            onClick={fetchUserLocation}
            className="p-3 bg-gray-300 rounded-2xl flex items-center gap-2 hover:bg-gray-400 transition-colors"
          >
            <MapPin /> Enable Location
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-2xl">
          {listTitle} <span className="text-primary-content">Terbaru</span>
        </h1>

        <Link href="/umkm" className="flex items-center gap-2 hover:text-primary-content transition-colors group">
          <p className="font-semibold">Show All</p>
          <ChevronRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <CardList useUmkm={useNewestUmkm} />
    </section>
  );
}

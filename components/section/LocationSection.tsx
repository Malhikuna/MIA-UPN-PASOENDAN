import LocationMap from "@/components/ui/map/LocationMap";
import NearbyLocationMap from "@/components/ui/map/NearbyLocationMap";
import React from "react";

export default function LocationSection() {
  return (
    <div className="container mx-auto px-12 py-5 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">
          Temukan UMKM Terdekat dari <span className="text-primary-content">Lokasimu</span>
        </h1>
        <p className="md:w-[711px] text-end pt-6">
          Kami bantu kamu menemukan pelaku usaha lokal di sekitarmu, biar belanja jadi lebih mudah dan mendukung sesama.
        </p>
      </div>
      <LocationMap mode={"list"} />
    </div>
  );
}

import { umkmData } from "@/data/umkm";
import { notFound } from "next/navigation";
import React from "react";
import ProductListCard from "@/components/layout/detail/ProductListCard";
import ImageGallery from "@/components/layout/detail/ImageGallery";
import LocationMap from "@/components/layout/detail/LocationMap";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const umkm = umkmData.find((item) => item.id === parseInt(id));

  if (!umkm) {
    notFound();
  }

  return (
    <div className="container flex flex-col gap-20 mx-auto px-8 py-8">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Image Gallery - Kiri */}
        <ImageGallery images={umkm.images} title={umkm.title} />

        {/* Informasi Toko */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{umkm.title}</h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span>📍</span>
              {umkm.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {umkm.category}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Deskripsi</h2>
            <p className="text-gray-700 leading-relaxed">{umkm.description}</p>
          </div>

          <button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg transition-colors">
            Hubungi Penjual
          </button>
        </div>
      </section>

      {/* List Card Product */}
      <section>
        <h1 className="text-center text-2xl font-bold mb-5">Produk Kita</h1>

        <div className="flex gap-15 overflow-x-auto w-full h-auto py-2 scrollbar-hide snap-x snap-mandatory">
          {
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="snap-center flex-shrink-0 w-[250px]">
                  <ProductListCard/>
                </div>
              ))
          }
        </div>
      </section>

      {/* Location */}
      <section>
        <h1 className="text-center text-2xl font-bold mb-5">Lokasi Kita</h1>

        <LocationMap/>
      </section>

    </div>
  );
}

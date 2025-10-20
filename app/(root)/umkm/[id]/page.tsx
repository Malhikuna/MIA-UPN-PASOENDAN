"use client";
import { umkmData } from "@/data/umkm";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import ProductListCard from "@/components/layout/detail/ProductListCard";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const umkm = umkmData.find((item) => item.id === parseInt(id));

  if (!umkm) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(umkm.images[0]);

  return (
    <div className="container flex flex-col gap-20 mx-auto px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Image Gallery - Kiri */}
        <div className="space-y-4">
          {/* Foto Besar */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-gray-300">
            <Image
              src={selectedImage}
              alt={umkm.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Foto Kecil */}
          <div className="grid grid-cols-3 gap-4">
            {umkm.images.map((img, index) => (
              <div
                key={index}
                className={`relative h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === img
                    ? "border-pink-500 scale-105"
                    : "border-gray-300 hover:border-pink-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

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
      </div>

      {/* Informasi Toko */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full h-auto">
        {
          Array(4)
          .fill(0)
          .map((_, i) => (
            <ProductListCard key={i}/>
          ))
        }
      </div>
    </div>
  );
}

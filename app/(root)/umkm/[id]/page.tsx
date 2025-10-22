import { umkmData } from "@/data/umkm";
import { notFound } from "next/navigation";
import React from "react";
import ProductCard from "@/components/ui/detail/ProductCard";
import ImageGallery from "@/components/ui/detail/ImageGallery";
import LocationMap from "@/components/ui/detail/LocationMap";
import { Heart, Share2, MessageCircle, MapPin, BadgeInfo } from 'lucide-react';
import BoxReview from "@/components/ui/detail/BoxReview";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const umkm = umkmData.find((item) => item.id === parseInt(id));

  if (!umkm) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20 pb-8">
      <section
        style={{
          backgroundImage: "url('/images/example.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative w-full h-auto bg-center bg-cover overflow-hidden">

        <div className="absolute inset-0 bg-white/60 backdrop-blur-xs" />

        <div className="relative container mx-auto px-6 lg:px-12 py-16">
          <div className="mb-5">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: umkm.title },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery - Kiri */}
            <ImageGallery images={umkm.images} title={umkm.title}/>

            {/* Informasi Toko */}
            <div className="flex flex-col justify-center gap-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-green-100 text-green-900 rounded-full text-sm font-semibold">
                  {umkm.category}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-4xl text-[#31725C] font-bold mb-2">{umkm.title}</h1>
                  <p className="text-gray-600 flex font-medium items-center gap-2">
                    <MapPin/>
                    {umkm.address}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Deskripsi</h2>
                  {/*<button className="w-10 h-10 btn btn-neutral rounded-full">
                    <BadgeInfo size={100}/>
                  </button>*/}
                  <p className="text-gray-700 leading-relaxed">{umkm.description}</p>
                </div>
              </div>

              <div className="flex gap-2 justify-between w-full h-10">
                <div className="flex gap-2">
                  {/*<button className="btn btn-primary rounded-xl">
                    Ikuti
                  </button>*/}

                  <button className="btn btn-neutral rounded-xl">
                    Hubungi Kami Lewat <MessageCircle size={20}/>
                  </button>
                </div>

                <div className="flex gap-2">
                  {/*<button className="flex justify-center items-center gap-2 cursor-pointer">
                    <Heart/> <span>Favorite</span>
                  </button>

                  <button className="flex justify-center items-center gap-2 cursor-pointer">
                    <Share2/> <span>Share</span>
                  </button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* List Card Product */}
      <section className="container mx-auto px-6 lg:px-12">
        <h1 className="text-center text-2xl font-bold mb-5">Produk <span className="text-[#008C15]">Kami</span></h1>

        <div className="flex gap-15 overflow-x-auto w-full h-auto py-2 scrollbar-hide snap-x snap-mandatory">
          {
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="snap-center flex-shrink-0 w-[250px]">
                  <ProductCard/>
                </div>
              ))
          }
        </div>
      </section>

      {/* Location */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">
            Temukan <span className="text-[#008C15]">Kami</span> di Sini
          </h1>

          <span className="max-w-150">
            Yuk, mampir langsung ke lokasi kami dan dukung usaha lokal di sekitarmu. Setiap kunjunganmu berarti besar bagi kami.
          </span>
        </div>

        <LocationMap/>
      </section>

      {/* Review */}
      {/*<section className="px-8">
        <BoxReview/>
      </section>*/}

    </div>
  );
}

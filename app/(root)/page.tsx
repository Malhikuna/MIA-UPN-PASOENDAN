"use client";
import Card from "@/components/ui/Card";
import Category from "@/components/ui/Category";
import LocationMap from "@/components/ui/detail/LocationMap";
import Input from "@/components/ui/Input";
import ToggleSwitch from "@/components/ui/ToggleSwitchProps";
import { mainCategories, subCategories } from "@/data/categories";

import { umkmData } from "@/data/umkm";
import { UmkmItem } from "@/types/umkm";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("fnb");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false); // ← Tambahkan state

  // Filter data
  const filteredData = umkmData.filter((umkm) => {
    // Filter berdasarkan main category
    const matchMainCategory = umkm.mainCategory === selectedMainCategory;

    // Filter berdasarkan sub category
    const matchSubCategory = selectedSubCategory === "all" || umkm.category === selectedSubCategory;

    // Filter berdasarkan search query
    const matchSearch =
      umkm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchMainCategory && matchSubCategory && matchSearch;
  });

  // Batasi data yang ditampilkan (3 atau semua)
  const displayedData = showAll ? filteredData : filteredData.slice(0, 3);

  // Get current sub categories
  const currentSubCategories = subCategories[selectedMainCategory as keyof typeof subCategories];

  return (
    <div className="">
      {/* Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="container mx-auto flex flex-col justify-center gap-5 md:min-h-[100vh] px-12 ">
          <h1 className="text-background text-6xl font-bold">
            Dekat di <span className="text-primary-content">Hati</span> <br /> Dekat di{" "}
            <span className="text-primary-content">Lokasi</span>
          </h1>
          <p className="md:w-[403px] text-background">
            Cari makanan, minuman, dan jasa dari UMKM terdekat cepat, mudah, dan dekat di hati.
          </p>
          <Input
            placeholder="Cari nama UMKM atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:max-w-[457px]"
          />
        </div>
      </div>

      {/* Category Section */}
      <div className="container mx-auto md:py-10 px-12">
        <div className="flex flex-col gap-4 mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-4xl">Pilih Kategori</h1>
            {/* Main Category Toggle Switch */}
            <ToggleSwitch
              options={mainCategories}
              selected={selectedMainCategory}
              onChange={(value) => {
                setSelectedMainCategory(value);
                setSelectedSubCategory("all"); // Reset sub category saat ganti main category
                setShowAll(false); // ← Reset showAll saat ganti category
              }}
            />
          </div>
          <p className="md:w-[513px]">
            Jelajahi berbagai UMKM terdekat dari kuliner, jasa, hingga produk lokal yang siap memenuhi kebutuhan Anda.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {currentSubCategories.map((subCat) => (
            <div className="flex flex-col items-center gap-3" key={subCat.value}>
              <Category
                selectedSubCategory={selectedSubCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                subCat={subCat}
                setShowAll={setShowAll}
              />
              {/* Label */}
              <span className="font-semibold text-sm text-center">{subCat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* UMKM List Section */}
      <div className="container mx-auto md:py-10 px-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">
            {selectedSubCategory === "all"
              ? selectedMainCategory === "fnb"
                ? "Semua F&B"
                : "Semua Jasa"
              : currentSubCategories.find((cat) => cat.value === selectedSubCategory)?.label}{" "}
            <span className="text-primary-content">Terdekat</span>
          </h1>

          {/* See All / Show Less Button - Hanya tampil jika data > 3 */}
          {filteredData.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 hover:text-primary-content transition-colors"
            >
              <p className="font-semibold">{showAll ? "Show Less" : "See All"}</p>
              <ChevronDown className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {displayedData.map((umkm: UmkmItem) => (
            <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
              <Card title={umkm.title} address={umkm.address} image={umkm.images[0]} />
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada UMKM ditemukan untuk kategori ini</p>
            <button
              onClick={() => {
                setSelectedSubCategory("all");
                setSearchQuery("");
                setShowAll(false);
              }}
              className="mt-4 px-6 py-2 bg-primary-content text-white rounded-lg hover:bg-primary-content"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Location Section */}
      <div className="container mx-auto px-12 pb-10">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="font-bold text-2xl">
            Temukan UMKM Terdekat dari <span className="text-primary-content">Lokasimu</span>
          </h1>
          <p className="md:w-[711px] text-end pt-6">
            Kami bantu kamu menemukan pelaku usaha lokal di sekitarmu, biar belanja jadi lebih mudah dan mendukung
            sesama.
          </p>
        </div>
        <LocationMap />
      </div>
    </div>
  );
}

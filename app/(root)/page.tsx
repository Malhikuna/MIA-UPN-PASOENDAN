"use client";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";
import Category from "@/components/ui/Category";
import Input from "@/components/ui/Input";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { umkmData } from "@/data/umkm";
import { UmkmItem } from "@/types/umkm";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const filteredData =
  //   selectedCategory === "all"
  //     ? umkmData
  //     : umkmData.filter((umkm) => umkm.category === selectedCategory);

  const filteredData = umkmData.filter((umkm) => {
    // Filter berdasarkan kategori
    const matchCategory = selectedCategory === "all" || umkm.category === selectedCategory;

    // Filter berdasarkan search query
    const matchSearch =
      umkm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="">
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="flex flex-col justify-center md:min-h-[80vh] px-25 ">
          <h1>CariKita tempat umkm berada</h1>
          <p className="md:w-[686px]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem consectetur sunt veniam ipsa voluptates
            maiores fugit nam possimus. Sequi ea ut delectus a cupiditate autem fuga deserunt, saepe quidem inventore!
          </p>
          <Input
            placeholder="Cari nama UMKM atau alamat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xl"
          />
        </div>
      </div>
      <div className="md:py-10 px-25">
        <div className="flex justify-between">
          <p>Category</p>
          <ThemeToggle />
        </div>
        <Category />
      </div>

      <div className="md:py-10 px-25 ">
        <div className="">
          <div className="">
            <h1>Our Services</h1>
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae natus molestias harum repellat. Commodi modi
            ipsa aperiam nam id quidem!
          </p>
        </div>
        {/* Filter Buttons */}
        <div className="my-4">
          <button
            className={`border px-4 py-2 font-bold mr-4 rounded ${
              selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-yellow-400 text-black"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            Semua
          </button>
          <button
            className={`border px-4 py-2 font-bold mr-4 rounded ${
              selectedCategory === "makanan" ? "bg-blue-500 text-white" : "bg-yellow-400 text-black"
            }`}
            onClick={() => setSelectedCategory("makanan")}
          >
            Makanan
          </button>
          <button
            className={`border px-4 py-2 font-bold mr-4 rounded ${
              selectedCategory === "minuman" ? "bg-blue-500 text-white" : "bg-yellow-400 text-black"
            }`}
            onClick={() => setSelectedCategory("minuman")}
          >
            Minuman
          </button>

          <button
            className={`border px-4 py-2 font-bold mr-4 rounded ${
              selectedCategory === "jasa" ? "bg-blue-500 text-white" : "bg-yellow-400 text-black"
            }`}
            onClick={() => setSelectedCategory("jasa")}
          >
            jasa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {filteredData.map((umkm: UmkmItem) => (
            <Link href={`/umkm/${umkm.id}`} key={umkm.id}>
              <Card title={umkm.title} address={umkm.address} description={umkm.description} image={umkm.images[0]} />
            </Link>
          ))}
        </div>
        {filteredData.length === 0 && (
          <p className="text-center text-gray-500 mt-8">Tidak ada data untuk kategori ini</p>
        )}
      </div>
    </div>
  );
}

"use client";
import Input from "@/components/ui/Input";
import { useUmkmStore } from "@/store/useUmkmStore";

export default function HeroSection() {
  const { searchQuery, setSearchQuery } = useUmkmStore();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.png')" }}
    >
      <div className="container mx-auto flex flex-col justify-center gap-5 min-h-[100vh] px-12">
        <h1 className="text-background text-5xl sm:text-6xl font-bold">
          Dekat di <span className="text-primary-content">Hati</span> <br />
          Dekat di <span className="text-primary-content">Lokasi</span>
        </h1>
        <p className="md:w-[403px] text-background">
          Cari makanan, minuman, dan jasa dari UMKM terdekat cepat, mudah, dan dekat di hati.
        </p>
        <Input
          placeholder="Cari nama UMKM atau alamat..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 outline-none text-sm text-white"
          bgColor={"bg-white/30"}
        />
      </div>
    </div>
  );
}

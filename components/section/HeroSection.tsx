"use client";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
  const handleScrollDown = () => {
    const categorySection = document.getElementById("category-section");
    if (categorySection) {
      const navbarHeight = 50;
      const elementPosition = categorySection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
    >
      <div className="container mx-auto flex flex-col justify-center gap-5 min-h-[100vh] px-12">

        <h1 className="text-background text-5xl sm:text-6xl font-bold">
          Dekat di <span className="text-primary-content">Hati</span> <br />
          Dekat di <span className="text-primary-content">Lokasi</span>
        </h1>
        <p className="md:w-[403px] text-background">
          Cari makanan, minuman, dan jasa dari UMKM terdekat cepat, mudah, dan
          dekat di hati.
        </p>
      
        <div className="absolute bottom-8 right-1/2 md:right-1/2 flex flex-col items-center gap-3 text-white">
          <p className="text-sm font-medium hidden md:block">Scroll Down</p>
          <button
            onClick={handleScrollDown}
            className="p-[15px] border-2 border-white rounded-full hover:bg-white/10 hover:border-primary-content hover:text-primary-content transition-all group"
          >
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
}

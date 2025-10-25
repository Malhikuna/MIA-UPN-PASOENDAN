import Input from "@/components/ui/Input";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const handleScrollDown = () => {
  const categorySection = document.getElementById('category-section');
  if (categorySection) {
    const navbarHeight = 50;
    const elementPosition = categorySection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
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
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 outline-none text-sm text-white"
          bgColor={"bg-white/30"}
        />
      </div>

      <div className="absolute bottom-8 right-8 md:right-12 flex items-center gap-3 text-white">
        <p className="text-sm font-medium hidden md:block">Scroll Down</p>
        <button 
          onClick={handleScrollDown}
          className="p-3 border-2 border-white rounded-full hover:bg-white/10 hover:border-primary-content hover:text-primary-content transition-all group"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
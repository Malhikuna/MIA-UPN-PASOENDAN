import HeroSection from "@/components/section/HeroSection";
import CategorySection from "@/components/section/CategorySection";
import UmkmListSection from "@/components/section/UmkmListSection";
import LocationSection from "@/components/section/LocationSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <CategorySection />

      <UmkmListSection />
      
      <LocationSection />
    </div>
  );
}

import HeroSection from "@/components/sections/HeroSection";
import CategorySection from "@/components/sections/CategorySection";
import UmkmListSection from "@/components/sections/UmkmListSection";
import LocationSection from "@/components/sections/LocationSection";

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

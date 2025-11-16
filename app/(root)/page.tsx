import HeroSection from "@/components/section/HeroSection";
import CategorySection from "@/components/section/CategorySection";
import UmkmListSection from "@/components/section/UmkmListSection";
import LocationSection from "@/components/section/LocationSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <CategorySection />

      <UmkmListSection />
      
      <LocationSection />
    </main>
  );
}

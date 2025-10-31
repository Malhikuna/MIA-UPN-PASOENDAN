import HeroSection from "@/components/section/HeroSection";
import CategorySection from "@/components/section/CategorySection";
import UmkmListSection from "@/components/section/UmkmListSection";
import LocationSection from "@/components/section/LocationSection";
import Image from "next/image";
import AboutSection from "@/components/section/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <CategorySection />

      <UmkmListSection />
      
      <LocationSection />
      {/* <AboutSection/> */}
    </main>
  );
}

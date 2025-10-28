"use client";
import HeroSection from "@/components/sections/HeroSection";
import CategorySection from "@/components/sections/CategorySection";
import UmkmListSection from "@/components/sections/UmkmListSection";
import LocationSection from "@/components/sections/LocationSection";
import { mainCategories, subCategories } from "@/data/categories";
import { umkmData } from "@/data/umkm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useUmkmFilter } from "@/hooks/useUmkmFilter";
import { useState, useMemo, useEffect } from "react";

export default function Home() {
  const [selectedMainCategory, setSelectedMainCategory, isClient] = useLocalStorage("selectedMainCategory", "fnb");
  const [selectedSubCategory, setSelectedSubCategory] = useLocalStorage("selectedSubCategory", "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
  if (isClient) {
    const theme = selectedMainCategory === "fnb" ? "fnb-theme" : "jasa-theme";
    document.documentElement.setAttribute("data-theme", theme);
  }
}, [selectedMainCategory, isClient]);

  // Get current sub categories
  const currentSubCategories = useMemo(
    () => subCategories[selectedMainCategory as keyof typeof subCategories],
    [selectedMainCategory]
  );

  // Filter data using custom hook
  const filteredData = useUmkmFilter(umkmData, selectedMainCategory, selectedSubCategory, searchQuery);



  // Get title for UMKM list
  const listTitle = useMemo(() => {
    if (selectedSubCategory === "all") {
      return selectedMainCategory === "fnb" ? "Semua F&B" : "Semua Jasa";
    }
    return currentSubCategories.find((cat) => cat.value === selectedSubCategory)?.label || "";
  }, [selectedMainCategory, selectedSubCategory, currentSubCategories]);

  // Handlers
  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value);
    setSelectedSubCategory("all");
    setShowAll(false);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
    setShowAll(false);
  };

  const handleReset = () => {
    setSelectedSubCategory("all");
    setSearchQuery("");
    setShowAll(false);
  };

  if (!isClient) {
    return null; 
  }

  return (
    <div>
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <CategorySection
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        setShowAll={setShowAll}
        mainCategories={mainCategories}
        currentSubCategories={currentSubCategories}
      />

      <UmkmListSection
        title={listTitle}
        filteredData={filteredData}
        showAll={showAll}
        onToggleShowAll={() => setShowAll(!showAll)}
        onReset={handleReset}
      />

      <LocationSection />
    </div>
  );
}












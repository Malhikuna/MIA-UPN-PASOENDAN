"use client";
import ToggleSwitch from "@/components/ui/ToggleSwitchProps";
import Category from "@/components/ui/Category";
import { useUmkmStore } from "@/store/useUmkmStore";
import { mainCategories, subCategories } from "@/data/categories";
import { useUmkmLogic } from "@/app/lib/umkm";
import { useEffect } from "react";

export default function CategorySection() {
  const { selectedMainCategory, selectedSubCategory, setShowAll } = useUmkmStore();

  const { currentSubCategories, handleMainCategoryChange, handleSubCategoryChange } = useUmkmLogic();

  useEffect(() => {
    const theme = selectedMainCategory === "fnb" ? "fnb-theme" : "jasa-theme";
    document.documentElement.setAttribute("data-theme", theme);
  }, [selectedMainCategory]);

  return (
    <div id="category-section" className="container mx-auto py-5 md:py-10 px-12">
      <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-between lg:items-start mb-5 gap-2">
        <div className="flex flex-col gap-2 w-full text-center lg:text-start">
          <h1 className="font-bold text-4xl">Pilih Kategori</h1>
          <div className="flex justify-center lg:justify-normal">
            <p className="md:w-[513px]">
              Jelajahi berbagai UMKM terdekat dari kuliner, jasa, hingga produk lokal yang siap memenuhi kebutuhan Anda.
            </p>
          </div>
        </div>
        <ToggleSwitch options={mainCategories} selected={selectedMainCategory} onChange={handleMainCategoryChange} />
      </div>

      <div className="flex gap-6 overflow-x-scroll scrollbar-hide p-1">
        {currentSubCategories.map((subCat) => (
          <div className="flex flex-col items-center gap-3" key={subCat.value}>
            <Category
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={handleSubCategoryChange}
              subCat={subCat}
              setShowAll={setShowAll}
            />
            <span className="font-semibold text-sm text-center">{subCat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import ToggleSwitch from "@/components/ui/ToggleSwitchProps";
import Category from "@/components/ui/Category";
import { useUmkmStore } from "@/store/useUmkmStore";
import { mainCategories, subCategories } from "@/data/categories";
import { useUmkmLogic } from "@/hooks/useUmkmLogic";
import { useEffect } from "react";

export default function CategorySection() {
  const { selectedMainCategory, selectedSubCategory, setShowAll } =
    useUmkmStore();

  const {
    currentSubCategories,
    handleMainCategoryChange,
    handleSubCategoryChange,
  } = useUmkmLogic();

  // useEffect(() => {
  //   const theme = selectedMainCategory === "fnb" ? "fnb-theme" : "jasa-theme";
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [selectedMainCategory]);

  return (
    <section
      id="category-section"
      className="container mx-auto py-5 md:py-9 px-8 md:px-12"
    >
      <div className="flex flex-col lg:flex-row  justify-center items-center lg:justify-between lg:items-start mb-5 gap-2">
        <div className="flex flex-col gap-2 w-full text-center lg:text-start">
          <h1 className="font-bold text-3xl md:text-4xl">Pilih Kategori</h1>
          <div className="flex justify-center lg:justify-normal">
            <p className="md:w-[513px]">
              Jelajahi berbagai UMKM terdekat dari kuliner, jasa, hingga produk
              lokal yang siap memenuhi kebutuhan Anda.
            </p>
          </div>
        </div>
        <ToggleSwitch
          options={mainCategories}
          selected={selectedMainCategory}
          onChange={handleMainCategoryChange}
        />
      </div>

      <div className="flex gap-6 overflow-x-scroll scrollbar-hide p-1">
        {currentSubCategories.map((subCat) => (
          <div
            className={`flex flex-col items-center gap-3 pb-2 relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-content after:origin-left after:transition-transform after:duration-300 ${
              selectedSubCategory === subCat.value
                ? "after:scale-x-100"
                : "after:scale-x-0 hover:after:scale-x-100"
            }`}
            key={subCat.value}
          >
            <Category
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={handleSubCategoryChange}
              subCat={subCat}
              setShowAll={setShowAll}
            />
            <span className="font-semibold text-sm text-center">
              {subCat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { useMemo } from "react";

import { useUmkmStore } from "@/store/useUmkmStore";
import { subCategories } from "@/data/categories";
import { useUmkmFilter } from "@/hooks/useUmkmFilter";
import { umkmData } from "@/data/umkm";
import { UmkmCategory, UmkmMainCategory } from "@/types/umkm";

export const useUmkmLogic = () => {
  const {
    selectedMainCategory,
    selectedSubCategory,
    searchQuery,
    showAll,
    setSelectedMainCategory,
    setSelectedSubCategory,
    setSearchQuery,
    setShowAll,
  } = useUmkmStore();

  const currentSubCategories = useMemo(
    () => subCategories[selectedMainCategory as keyof typeof subCategories],
    [selectedMainCategory]
  );

  // Filter data using custom hook
  const filteredData = useUmkmFilter(umkmData, selectedMainCategory, selectedSubCategory, searchQuery);

  // Display data (3 or all)
  const displayedData = useMemo(() => (showAll ? filteredData : filteredData.slice(0, 3)), [showAll, filteredData]);

  // Get title for UMKM list
  const listTitle = useMemo(() => {
    if (selectedSubCategory === "all") {
      return selectedMainCategory === "fnb" ? "Semua F&B" : "Semua Jasa";
    }
    return currentSubCategories.find((cat) => cat.value === selectedSubCategory)?.label || "";
  }, [selectedMainCategory, selectedSubCategory, currentSubCategories]);

  // Handlers
  const handleMainCategoryChange = (value: string) => {
    setSelectedMainCategory(value as UmkmMainCategory);
    setSelectedSubCategory("all");
    setShowAll(false);
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value as UmkmCategory);
    setShowAll(false);
  };

  const handleReset = () => {
    setSelectedSubCategory("all");
    setSearchQuery("");
    setShowAll(false);
  };

  return {
    currentSubCategories,
    filteredData,
    displayedData,
    listTitle,
    handleMainCategoryChange,
    handleSubCategoryChange,
    handleReset,
  };
};

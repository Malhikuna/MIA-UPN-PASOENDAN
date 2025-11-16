"use client";
import { useMemo } from "react";

import { useUmkmStore } from "@/store/useUmkmStore";
import { subCategories } from "@/data/categories";
import { useUmkmFilter } from "@/hooks/useUmkmFilter";
import { CurrentFilter, UmkmCategory, UmkmMainCategory } from "@/types/umkm";
import { useUmkm } from "./useUmkm";

export const useUmkmLogic = () => {
  const selectedMainCategory = useUmkmStore((s) => s.selectedMainCategory);
  const selectedSubCategory = useUmkmStore((s) => s.selectedSubCategory);
  const searchQuery = useUmkmStore((s) => s.searchQuery);
  const showAll = useUmkmStore((s) => s.showAll);
  const currentFilter = useUmkmStore((s) => s.currentFilter);

  const setSelectedMainCategory = useUmkmStore((s) => s.setSelectedMainCategory);
  const setSelectedSubCategory = useUmkmStore((s) => s.setSelectedSubCategory);
  const setSearchQuery = useUmkmStore((s) => s.setSearchQuery);
  const setShowAll = useUmkmStore((s) => s.setShowAll);
  const setCurrentFilter = useUmkmStore((s) => s.setCurrentFilter);

  const currentSubCategories = useMemo(
    () => subCategories[selectedMainCategory as keyof typeof subCategories],
    [selectedMainCategory]
  );

  // get data
  const { umkmList, loading } = useUmkm();

  // Filter data using custom hook
  const filteredData = useUmkmFilter(umkmList, selectedSubCategory, searchQuery);

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

  const handleCurrentFilterChange = (value: string) => {
    setCurrentFilter(value as CurrentFilter);
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
    loading,
    handleMainCategoryChange,
    handleSubCategoryChange,
    handleReset,
    handleCurrentFilterChange,
    currentFilter,
  };
};

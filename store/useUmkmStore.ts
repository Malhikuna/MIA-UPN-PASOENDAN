import { CurrentFilter, UmkmCategory, UmkmMainCategory } from "@/types/umkm";
import { create } from "zustand";

interface UmkmStore {
  // nearbyUmkm: UmkmItemm[];
  currentFilter: CurrentFilter;
  selectedMainCategory: UmkmMainCategory;
  selectedSubCategory: UmkmCategory | "all";
  searchQuery: string;
  showAll: boolean;
  setSelectedMainCategory: (v: UmkmMainCategory) => void;
  setSelectedSubCategory: (v: UmkmCategory | "all") => void;
  setSearchQuery: (v: string) => void;
  setShowAll: (v: boolean) => void;
  setCurrentFilter: (v: CurrentFilter) => void;
  // setNearUmkm: (v: UmkmItemm) => void;
}

export const useUmkmStore = create<UmkmStore>((set) => ({
  // nearbyUmkm: [],
  selectedMainCategory: "fnb",
  selectedSubCategory: "all",
  searchQuery: "",
  showAll: false,
  currentFilter: "newest",
  setSelectedMainCategory: (v) => set({ selectedMainCategory: v, selectedSubCategory: "all" }),
  setSelectedSubCategory: (v) => set({ selectedSubCategory: v, searchQuery: "" }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  setShowAll: (v) => set({ showAll: v }),
  setCurrentFilter: (v) => set({ currentFilter: v }),
  // setNearUmkm: (v) => set({nearbyUmkm}),
}));

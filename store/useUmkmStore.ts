import { CurrentFilter, UmkmCategory, UmkmMainCategory } from "@/types/umkm";
import { create } from "zustand";

interface UmkmStore {
  selectedMainCategory: UmkmMainCategory;
  selectedSubCategory: UmkmCategory | "all";
  currentFilter: CurrentFilter;
  umkmImageUrl: string
  searchQuery: string;
  showAll: boolean;
  setSelectedMainCategory: (v: UmkmMainCategory) => void;
  setSelectedSubCategory: (v: UmkmCategory | "all") => void;
  setSearchQuery: (v: string) => void;
  setShowAll: (v: boolean) => void;
  setCurrentFilter: (v: CurrentFilter) => void;
}

export const useUmkmStore = create<UmkmStore>((set) => ({
  selectedMainCategory: "fnb",
  selectedSubCategory: "all",
  umkmImageUrl: '/images/umkm/default-umkm-profile.webp',
  searchQuery: "",
  showAll: false,
  currentFilter: "newest",
  setSelectedMainCategory: (v) =>
    set({
      selectedMainCategory: v,
      selectedSubCategory: "all",
      umkmImageUrl:
        v === "jasa"
          ? "/images/umkm/default-umkm-jasa-profile.webp"
          : "/images/umkm/default-umkm-profile.webp",
    }),
  setSelectedSubCategory: (v) => set({ selectedSubCategory: v, searchQuery: "" }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  setShowAll: (v) => set({ showAll: v }),
  setCurrentFilter: (v) => set({ currentFilter: v }),
}));

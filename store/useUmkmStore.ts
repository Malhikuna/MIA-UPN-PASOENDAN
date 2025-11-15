import { UmkmCategory, UmkmMainCategory } from "@/types/umkm";
import { create } from "zustand";

interface UmkmStore {
  // nearbyUmkm: UmkmItemm[];
  selectedMainCategory: UmkmMainCategory;
  selectedSubCategory: UmkmCategory | "all";
  umkmImageUrl: string
  searchQuery: string;
  showAll: boolean;
  setSelectedMainCategory: (v: UmkmMainCategory) => void;
  setSelectedSubCategory: (v: UmkmCategory | "all") => void;
  setSearchQuery: (v: string) => void;
  setShowAll: (v: boolean) => void;
  // setNearUmkm: (v: UmkmItemm) => void;
}

export const useUmkmStore = create<UmkmStore>((set) => ({
  // nearbyUmkm: [],
  selectedMainCategory: "fnb",
  selectedSubCategory: "all",
  umkmImageUrl: '/images/umkm/default-umkm-profile.webp',
  searchQuery: "",
  showAll: false,
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
  // setNearUmkm: (v) => set({nearbyUmkm}),
}));

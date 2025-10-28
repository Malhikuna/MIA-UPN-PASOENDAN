import { UmkmCategory, UmkmMainCategory } from "@/types/umkm";
import { create } from "zustand";

interface UmkmStore {
  selectedMainCategory: UmkmMainCategory;
  selectedSubCategory: UmkmCategory | "all";
  searchQuery: string;
  showAll: boolean;
  setSelectedMainCategory: (v: UmkmMainCategory) => void;
  setSelectedSubCategory: (v: UmkmCategory | "all") => void;
  setSearchQuery: (v: string) => void;
  setShowAll: (v: boolean) => void;
}

export const useUmkmStore = create<UmkmStore>((set) => ({
  selectedMainCategory: "fnb",
  selectedSubCategory: "all",
  searchQuery: "",
  showAll: false,
  setSelectedMainCategory: (v) => set({ selectedMainCategory: v, selectedSubCategory: "all" }),
  setSelectedSubCategory: (v) => set({ selectedSubCategory: v, searchQuery: "" }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  setShowAll: (v) => set({ showAll: v }),
}));

// export const useUmkmStore = create<UmkmStore>()(
//   persist(
//     (set) => ({
//       selectedMainCategory: "fnb",
//       selectedSubCategory: "all",
//       searchQuery: "",
//       showAll: false,
//       setSelectedMainCategory: (v) =>
//         set({
//           selectedMainCategory: v,
//           selectedSubCategory: "all",
//         }),
//       setSelectedSubCategory: (v) =>
//         set({
//           selectedSubCategory: v,
//           searchQuery: "",
//         }),
//       setSearchQuery: (v) => set({ searchQuery: v }),
//       setShowAll: (v) => set({ showAll: v }),
//     }),
//     {
//       name: "umkm-storage",
//     }
//   )
// );
